import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Navigation extends React.Component {

  render() {
    let items = [];
    if (this.props.currentPage === "productCart") {
      items.push(<NavItem key="logout">
        <a className="logout" href="/">Logout</a>
      </NavItem>
      )
    }
    else {
      items.push(null);
    }
    return (
      <React.Fragment>
        <Navbar className="navbar-dark cusNavbar">
          <Navbar.Brand className="d-flex align-items-center">
            <img height="70" alt="Store logo" src={process.env.PUBLIC_URL + '/images/logo.png'} />
            <span> The Good Shop</span>
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {items.length > 0 ? items : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
};

export default Navigation;

