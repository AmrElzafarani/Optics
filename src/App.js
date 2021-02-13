import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reports from "./Components/Layout/Reports";
import SideDrawer from "./Components/Layout/SideDrawer";
import Header from "./Components/Layout/Header";
import AllUsers from "./Components/Pages/AllUsers";
import AddUser from "./Components/Pages/AddUser";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <>
      {/* <div className="d-flex"> */}
      <Header />

      <Router>
        <div className="d-flex">
          <SideDrawer />

          {/* <Layout /> */}
          <div className="page-content">
            <Switch>
              <Route path="/reports" component={Reports} />
              <Route path="/All-users" component={AllUsers} />
              <Route path="/Add-user" component={AddUser} />
            </Switch>
          </div>
        </div>
      </Router>
      {/* </div> */}
    </>
  );
}

export default App;
