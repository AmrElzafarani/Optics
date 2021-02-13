import React, { useState } from "react";
import { FaBars, FaTemperatureHigh } from "react-icons/fa";
import { Button, Nav } from "react-bootstrap";
import Header from './Header';

import { SidebarData } from "./SidebarData";
import "./SideDrawer.css";

import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [sidebar, setSidebar] = useState(false);
  //toggle sidenav
  const showSidebar = () => { setSidebar(!sidebar)};
  return (
    <>
       {/* <div className="sidebar">
        <Button className="menu-bars" onClick={showSidebar}>
        </Button>
      </div>  */}
      

      <Nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
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
