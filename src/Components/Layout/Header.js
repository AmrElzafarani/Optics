import React, {useState} from "react";
import {FaBars} from "react-icons/fa";

import {Navbar, Form, InputGroup, FormControl, Button, Nav} from "react-bootstrap";
import showSidebar from "./SideDrawer";

import "../Layout/SideDrawer.css";


const Header = (props) => {


    return (
        <div>
            <Navbar className="bg-light justify-content-between">
                    <FaBars className="menu-bars" onClick={props.showSidebar}/>
                <Form inline className="bg-light justify-content">





                    <Button type="submit">Submit</Button>
                </Form>
            </Navbar>
        </div>

    );
};

export default Header;
