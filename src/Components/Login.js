import React from 'react';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValid: false, userName: "", password: ""};

  }

  handleuserNameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (event) => {
    if (this.state.userName !== " " && this.state.userName.length > 0 && this.state.password !== " " && this.state.password.length > 0)
      this.props.history.replace('/productCart', { userName: this.state.userName });
  }

  componentDidMount() {
    if (!this.state.isValid) {
      document.body.style.backgroundSize = "cover";
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header className="cusTitle">
            Login
            </Card.Header>
          <Card.Body id="divLogin">
            <Form horizontal="true">
              <Form.Group controlId="formHorizontaluserName">
                <Col sm={12}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="userName"
                    className="input-lg" onChange={this.handleuserNameChange} type="text" required />
                </Col>
              </Form.Group>

              <Form.Group controlId="formHorizontalPassword">
                <Col sm={12}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} name="password"
                    className="input-lg" onChange={this.handlePasswordChange} type="password" required />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={12} className="ml1 text-center">
                  <Button className="align-self-right customBlueBg" size="md" type="submit" onClick={this.handleSubmit}>
                    Sign in
                </Button>
                </Col>

              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Login;
