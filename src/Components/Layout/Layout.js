import React, {Component} from 'react'
import SideDrawer from './SideDrawer';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Reports from "./Reports";
import AllUsers from "../Pages/AllUsers";
import AddUser from "../Pages/AddUser";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: !this.state.showSideDrawer } );
    }


    render() {
        return (
            <>
                <div>
                    <Header toggle={this.sideDrawerClosedHandler}/>
                </div>
                <Router>
                    <div className="d-flex">
                        <SideDrawer
                            open={this.sideDrawerClosedHandler}
                        />
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


        )
    }
}

export default Layout
