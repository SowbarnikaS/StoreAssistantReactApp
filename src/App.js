import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from "./Components/LoginForm";
import ProductCart from "./Components/ProductCart";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path='/' component={LoginForm} exact />
          <Route path='/productCart' component={ProductCart} exact />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;