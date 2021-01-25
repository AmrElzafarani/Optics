import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";
// import '../../../node_modules/bootstrap/dist/css/bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
          <Button variant="primary">Primary</Button>{' '}

      </Navbar>
    );
  }
}

export default Header;
