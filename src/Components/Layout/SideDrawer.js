import React, {useState} from "react";
import { FaBars } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
import {SidebarData} from './SidebarData';
import './SideDrawer.css';

import { Link } from "react-router-dom";

const SideDrawer = () => {

  //1st value: state sidebar , 2nd value update state , false for not showing
  const [sidebar, setSidebar] = useState(false);
  //toggle sidenav
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div>
      <div className="sidebar">
        <div className="menu-bars">
          <FaBars onClick={showSidebar}/>
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}

        </ul>
      </nav>
    </div>
  );
};

export default SideDrawer;
