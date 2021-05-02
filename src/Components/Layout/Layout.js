import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideDrawer from "./SideDrawer";
import Reports from "./Reports";
import AllUsers from "../Pages/AllUsers";
import AddUser from "../Pages/AddUser";
import Language from "./Language";
import Products from "../Pages/Products";
import Add from "../Pages/Add";
import Bill from "../Pages/Wholesale Orders/Bill";
import AllOrders from "../Pages/Wholesale Orders/AllOrders";

const Layout = () => {

    let languageStoredInLocalStorage = localStorage.getItem("language");

    let [language, setLanguage] = useState(
        languageStoredInLocalStorage ? languageStoredInLocalStorage : "English"
    );
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    const viewState = () => {
        if (document.documentElement.clientWidth < 600) {
            setSidebar(true);
        } else {
            setSidebar(false);
        }
    }
    useEffect(() => {
        //Hide sidebar on small devices in first render
        viewState();
        return window.addEventListener("resize", viewState);
    }, [])

    function storeLanguageInLocalStorage(language) {

        localStorage.setItem("language", language);
    }

    return (
        <>
            <div className="d-flex flex-row">
                <Router>
                    <SideDrawer sidebar={sidebar}/>

                    <div className="d-flex flex-column flex-shrink-1 flex-grow-1">
                        <Language
                            language={language}
                            handleSetLanguage={language => {
                                setLanguage(language);
                                storeLanguageInLocalStorage(language);
                            }}
                        />

                        <Header showSidebar={showSidebar}/>

                        <div>
                            <Switch>
                                <Route path="/reports" component={Reports}/>
                                <Route path="/All-users" component={() => <AllUsers language={Language}/>}/>
                                <Route path="/Add-user" component={() => <AddUser language={Language}/>}/>
                                <Route path="/Products" component={() => <Products language={Language}/>}/>
                                <Route path="/Bill" component={() => <Bill language={Language}/>}/>
                                <Route path="/All-orders" component={() => <AllOrders language={Language}/>}/>
                                <Route path="/Add" component={() => <Add language={Language}/>}/>

                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        </>
    );

}

export default Layout;