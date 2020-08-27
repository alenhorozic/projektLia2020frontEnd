import React from "react";
import { MainMenuItem, MainMenu } from "../MainMenu/MainMenu";

interface RoleMainMenuProperties {
    role: 'user'|'administrator'|'visitor';
}

export default class RoleMainMenu extends React.Component<RoleMainMenuProperties> {
    render() {
        let items: MainMenuItem[]=[];

        switch(this.props.role) {
            case 'visitor'        : items = this.getVisitorMenuItems();break;
            case 'user'           : items = this.getUserMenuItems();break;
            case 'administrator'  : items = this.getAdministratorMenuItems();break;
        }
        return<MainMenu items={items}/>
    }
    getUserMenuItems(): MainMenuItem[]{
        return[
            new MainMenuItem("Home","/"),
            new MainMenuItem("Contact","/contact"),
            new MainMenuItem("About us","/about-us"),        
            new MainMenuItem("User Log Out","/user/logout"),
        ];
    }
    getAdministratorMenuItems(): MainMenuItem[]{
        return[
            new MainMenuItem("Home","/"),
            new MainMenuItem("Contact","/contact"),
            new MainMenuItem("About us","/about-us"),
            new MainMenuItem("Administrator Log Out","/administrator/logout"),
        ];
    }
    getVisitorMenuItems(): MainMenuItem[]{
        return[
        new MainMenuItem("Home","/"),
        new MainMenuItem("Contact","/contact"),
        new MainMenuItem("About us","/about-us"),
        new MainMenuItem("Log in/user","/user/login"),
        new MainMenuItem("Log in/administrator","/administrator/login"),
        ];
    }
}