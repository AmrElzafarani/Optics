import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reports from "./Components/Layout/Reports";
import SideDrawer from "./Components/Layout/SideDrawer";
import Header from "./Components/Layout/Header";
import AllUsers from "./Components/Pages/AllUsers";
import AddUser from "./Components/Pages/AddUser";
import Layout from "./Components/Layout/Layout";

function App() {

  const [sidebar, setSidebar] = useState(false);
  //toggle sidenav
  const showSidebar = () => {
    return setSidebar(!sidebar);
  };
  return (
    <>
      <Header showSidebar={showSidebar}/>

      <Router>
        <div className="d-flex">
          <SideDrawer sidebar={sidebar}/>

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
      <Reports age="26" />
       {/*</div>*/}
    </>
  );
}

export default App;
