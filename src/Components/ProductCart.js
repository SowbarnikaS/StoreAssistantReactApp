import React from 'react';
import Products from './Products';
import Navigation from './Navigation';
import { Form, Row, Col, Card, Button, Alert } from "react-bootstrap";
import Footer from './Footer';
import axios from 'axios';
import ChatWidget from './Chat/ChatWidget';


class ProductCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      chatOn: false,
      messages: [],
      path: "productCart",
      orderPlaced: false,
      showAlert: false,
      formValid: false,
      alertHeader: "",
      alertMessage: "",
      alert: "info"

    }
    this.firstName = React.createRef();

    this.lastName = React.createRef();
    this.phoneNumber = React.createRef();

    this.email = React.createRef();
    this.order = {};

  }

  componentDidMount() {
    var totalproducts = Math.floor(Math.random() * 3) + 4;
    document.body.style.backgroundImage = "none";
    axios.get(process.env.PUBLIC_URL+"resources/products.json")
      .then((response) => {
        var randomProducts = [];
        for (var i = 0; i < totalproducts; i++) {
          var rand = response.data.products[Math.floor(Math.random() * 10)];
          randomProducts.push(rand);
        }
        var uniqueArray = randomProducts.filter(function (item, pos) {
          return randomProducts.indexOf(item) === pos;
        })
        this.setState({ products: uniqueArray })
      })
      .catch(err => console.log("Error while fetching products in cart"))
  }

  handleClick = (e) => {
    var clicked = !this.state.chatOn;
    this.setState({ chatOn: clicked });
  }

  handleChatClose = (value) => {
    this.setState({ chatOn: value })
  }

  handleFirstNameChange = (e) => {
    this.isFormValid();
  }

  handlePhoneNumberChange = (e) => {
    this.isFormValid();
  }

  handleLastNameChange = (e) => {
    this.isFormValid();
  }

  handleEmailChange = (e) => {
    this.isFormValid();
  }

  placeOrder = (e) => {
    var phone = this.phoneNumber.current.value;
    this.setState({ show: false });
    if (!isNaN(phone) && (phone.length === 10)) {
      this.order = {
        firstName: this.firstName.current.value,
        products: this.state.products
      }
      this.setState({
        alertHeader: "Order Placed!",
        alertMessage: "Your order has been placed successfully! Happy Shopping! Connect with us on our Chat assistant.",
        showAlert: true,
        orderPlaced: true,
        alert: "success",
        chatOn: true
      });
    }
    else {
      this.setState({
        alertHeader: "Invalid Phone Number!",
        alertMessage: "Please check phone number entered. Expecting a 10 digit phone number",
        showAlert: true,
        alert: "danger"
      })
    }
    window.scrollTo(0, 0);

  }

  closeAlert = (e) => {
    this.setState({ showAlert: false });
  }

  isFormValid = () => {
    if (this.firstName.current.value && this.lastName.current.value && this.email.current.value && this.phoneNumber.current.value)
      this.setState({ formValid: true })
  }

  render() {
    let items = [];
    let userName = "";
    if (this.firstName.current && this.firstName.current.value.length > 0) {
      userName = this.firstName.current.value
    } else if (this.props.history.location.state) {
      userName = this.props.history.location.state.userName;
    }
    else {
      userName = "Anonymous user";
    }

    this.state.products ? this.state.products.forEach((item, index) => {
      items.push(
        <div key={index} className="col col-md-3 col-lg-3">
          <Products pid={item.pdtCode} price={item.pdtPrice} name={item.pdtName} desc={item.pdtDescription} 
          img={item.pdtImg} deliveryOn={item.expDeliveryOn} />
        </div>);
    }) : items.push(null)
    return (
      <div>
        <Navigation currentPage={this.state.path} />
        <div className="container p-4 pb-0">
          {this.state.showAlert ?
            (<Alert variant={this.state.alert} onClose={this.closeAlert} dismissible>
              <Alert.Heading>{this.state.alertHeader}</Alert.Heading>
              <p>
                {this.state.alertMessage}
              </p>
            </Alert>) : null
          }
          <Card>
            <Card.Header className="cusTitle">Your Details</Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="fname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control required ref={this.firstName} disabled={this.state.orderPlaced} onChange={this.handleFirstNameChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="lname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control ref={this.lastName} disabled={this.state.orderPlaced} onChange={this.handleLastNameChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" required ref={this.phoneNumber} disabled={this.state.orderPlaced} onChange={this.handlePhoneNumberChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Label>E-Mail</Form.Label>
                      <Form.Control required ref={this.email} disabled={this.state.orderPlaced} onChange={this.handleEmailChange} />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="cusTitle">Products in your Cart</Card.Header>
            <Card.Body>
              <div className="row">
                {items.length > 0 ? items : null}
              </div>
            </Card.Body>
          </Card>
          <div className="row">
            <div className="col-12 text-center p-3">
              {!this.state.orderPlaced ?
                (<Button variant="primary" size="lg" onClick={this.placeOrder} disabled={!this.state.formValid}
                  className="customBlueBg">Place Order</Button>) : null}
            </div>
          </div>
        </div>
        <Footer />
        <div className="chatBtn">
          <Button className="noBtnStyle" onClick={this.handleClick}>
            <img src={process.env.PUBLIC_URL + '/images/bot.png'} alt="Chat icon" className="chatWidgetIcon"></img>
          </Button>
        </div>
        <ChatWidget displayChat={this.state.chatOn} close={this.handleChatClose} orderPlaced={this.order} userName={userName}></ChatWidget>
      </div>
    );
  }
}

export default ProductCart;
