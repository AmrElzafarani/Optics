import React from "react";
import { FaBars } from "react-icons/fa";

import { Navbar, Form, InputGroup, FormControl, Button,Nav } from "react-bootstrap";
import showSidebar from "./SideDrawer";

const Header = (props) => {
  return (
    <div className="sidebar">
      <Button onClick={props.showSidebar} className="menu-bars">

        Amr
      </Button>
      
    </div>
    

    // <Navbar className="bg-light justify-content-between">
    //   <Form inline>
    //     <InputGroup>
    //       <InputGroup.Prepend>
    //         <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    //       </InputGroup.Prepend>
    //       <FormControl
    //         placeholder="Username"
    //         aria-label="Username"
    //         aria-describedby="basic-addon1"
    //       />
    //     </InputGroup>
    //   </Form>
    //   <Form inline>
    //     <FormControl
    //       type="text"
    //       placeholder="Search"
    //       className=" mr-sm-2"
    //     />
    //     <Button type="submit">Submit</Button>
    //   </Form>
    // </Navbar>
  );
};

export default Header;
