import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideDrawer from "./SideDrawer";
import Reports from "./Reports";
import AllUsers from "../Pages/AllUsers";
import AddUser from "../Pages/AddUser";

const Layout = () => {

    const [sidebar, setSidebar] = useState(false);
    const [mobileView, setMobileView] = useState(true);

    const showSidebar = () => {
        setSidebar(!sidebar);
    };
    // const mobileView = () => {
    //     (true);
    // }

    const viewState = () => {
        if (document.documentElement.clientWidth < 600) {
            console.log("mobile view");
            setSidebar(true);
            setMobileView(false);
        } else if (document.documentElement.clientWidth > 600) {
            setSidebar(false);
            setMobileView(true);

        }
    }

    useEffect(() => {
        // viewState();
        return  window.addEventListener("resize", viewState);


    }, [])
    return (
        <>
            <Header

                showSidebar={showSidebar}/>

            <Router>
                <div className="d-flex">
                    <SideDrawer sidebar={sidebar}/>

                    <div className="page-content">
                        <Switch>
                            <Route path="/reports" component={Reports}/>
                            <Route path="/All-users" component={AllUsers}/>
                            <Route path="/Add-user" component={AddUser}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </>
    );

}

export default Layout;