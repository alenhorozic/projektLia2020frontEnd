import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import ContactPage from './components/ContactPage/ContactPage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import UserLoginPage from './components/UserLoginPage/UserLoginPage';
import AdministratorLoginPage from './components/AdministratorLoginPage/AdministratorLoginPage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { UserRegistrationPage } from './components/UserRegistrationPage/UserRegistrationPage';
import { AdministratorRegistrationPage } from './components/AdministratorRegistrationPage/AdministratorRegistrationPage';
import AdministratorHomePage from './components/AdministratorHomePage/AdministratorHomePage';
import UserHomePage from './components/UserHomePage/UserHomePage';
import AccauntUserPage from './components/AccauntUserPage/AccauntUserPage';
import TransaktionPage from './components/TransaktionPage/TransaktionPage';

const menuItems = [
  new MainMenuItem("Home","/"),
  new MainMenuItem("Contact","/contact"),
  new MainMenuItem("About us","/about-us"),
  new MainMenuItem("Log in/user","/user/login"),
  new MainMenuItem("Log in/administrator","/administrator/login"),
  new MainMenuItem("User Log Out","/user/logout"),
  new MainMenuItem("Administrator Log Out","/administrator/logout"),
];

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items={menuItems}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path ="/" component={ HomePage } />
        <Route path ="/contact" component={ ContactPage } />
        <Route path ="/about-us" component={ AboutUsPage } />
        <Route path ="/user/login" component={ UserLoginPage } />
        <Route path ="/administrator/login" component={ AdministratorLoginPage } />
        <Route path ="/administrator/registeruser" component={UserRegistrationPage} />
        <Route path ="/administrator/registeradministrator" component={AdministratorRegistrationPage} />
        <Route path ="/administrator/administratorhomepage" component={AdministratorHomePage} />
        <Route path ="/user/userhomepage" component={UserHomePage} />
        <Route path ="/accaunt" component={AccauntUserPage} />
        <Route path ="/transaktion" component={TransaktionPage} />
        
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
