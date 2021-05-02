import React from "react";
import { Nav } from "react-bootstrap";

import { SidebarData } from "./SidebarData";
import "./SideDrawer.css";

import { Link } from "react-router-dom";

const SideDrawer = (props) => {


  return (

    <>
        <Nav className="justify-content-center">

            <ul className={props.sidebar ? "nav-menu active" : "nav-menu"}>
                <h2>Iconic</h2>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Nav>
    </>
  );
};

export default SideDrawer;

