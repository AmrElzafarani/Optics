import React, {useState} from 'react'
import { SidebarData } from './SidebarData'
import SideDrawer from './SideDrawer';
import Header from './Header';

function Layout() {

    const [sidebar, setSidebar] = useState(true);
  //toggle sidenav
  const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <Header sidebartoggle={showSidebar} />
            <SideDrawer />
        </div>
    )
}

export default Layout
