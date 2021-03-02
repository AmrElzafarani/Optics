import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const users =
    [
      {
        title: "All-Users",
        path: "/All-Users",
        icon: <FaIcons.FaCartPlus />,
        cName: "nav-text",
      },
      {
        title: "Add-User",
        path: "/Add-User",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
      }
    ]

export const SidebarData = [

  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",

  },
  {
    title: "All-Users",
    path: "/All-Users",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Add-User",
    path: "/Add-User",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Language",
    path: "/language",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },

  // {
  //   title : "Users",
  //   icon:<IoIcons.IoMdHelpCircle />,
  //   cName:"nav-text"
  // }


];
