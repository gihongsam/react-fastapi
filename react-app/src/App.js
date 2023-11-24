import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
//import 'react-pro-sidebar/dist/css/styles.css';
import Finance from './Finance'; // Finance 컴포넌트
import EnglishWords from './EnglishWords'; // EnglishWords 컴포넌트

import './styles.css'
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
/*
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
*/

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (

    <div>
      <Router>
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar for navigation */}
          <Sidebar className='sidebar' collapsed={collapsed}>
            <Menu>
              <MenuItem
                /*component={<Link to="/" className="link" />}*/
                className="menu1"
                icon={
                  <MenuRoundedIcon />
                }
                onClick={handleToggleSidebar}
              >
              </MenuItem>
              <MenuItem
                component={<Link to="/finance" className="link" />}
                icon={<MonetizationOnRoundedIcon />}>
                Finance
              </MenuItem>
              <MenuItem
                component={<Link to="/english-words" className="link" />}
                icon={<ReceiptRoundedIcon />}>
                영어단어 변환
              </MenuItem>
              <SubMenu label="SubMenu">
                <MenuItem> SubMenu1 </MenuItem>
                <MenuItem> SubMenu2 </MenuItem>
              </SubMenu>
            </Menu>
          </Sidebar>
          {/* Main content area */}
          <div style={{ width: '100%', padding: '16px' }}>

            <Routes>
              <Route path="/finance" element={<Finance />} />
              <Route path="/english-words" element={<EnglishWords />} />
            </Routes>
          </div>
        </div>
      </Router>


    </div>
  );
};


export default App;
