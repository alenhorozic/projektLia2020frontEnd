import React from "react";
import { Redirect } from "react-router-dom";
import { removeUserToken } from "../../api/api";

interface UserLogoutPageState {
    done:boolean;
}

export class UserLogoutPage extends React.Component {
   state: UserLogoutPageState;
   
   constructor(props: Readonly<{}>){
       super(props)

    this.state={
        done:false,
    };
   }
   finished(){
       this.setState({
           done:true,
       });
   }
   render(){
       if(this.state.done){
           return <Redirect to=""/>
       }
       return (
           <p>Logging out......</p>
       );
   }
   componentDidMount(){
       this.doLogout();
   }
   componentDidUpdate(){
    this.doLogout();
   }

   doLogout() {
    removeUserToken('user');
    this.finished();
   }
}