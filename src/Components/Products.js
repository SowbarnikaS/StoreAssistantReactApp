import React from 'react';
import { Card } from 'react-bootstrap';

class Products extends React.Component {
  render() {
    return (
      <Card className="h-100 mb-3 pt-3">
        <Card.Img variant="top" src={this.props.img} alt="products" className="img img-rounded img-responsive align-self-center w-50" />
        <Card.Body>
          <Card.Text className="text-center">
            <div className="cusTitle cusCardText">{this.props.name}</div>
            <div className="cusSubtitle cusCardText">Rs.{this.props.price}</div>
            <div className="cusCardText">{this.props.desc}</div>
            <div className="cusCardText">Expected delivery on: <br/>{this.props.deliveryOn}</div>
          </Card.Text>
        </Card.Body>
      </Card>

    )
  }
}

export default Products;
