import React from 'react';
import { Container, Col, Card, Form, Button, Alert, Row } from 'react-bootstrap';
import api, { ApiResponse } from '../../api/apiAdministrator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface AdministratorRegistrationPageState {
    formData:{
        username: string;
        email: string;
        password: string;
    };
    errorMessage?: string;
    isRegistrationComplete?: boolean;
    isAdministratorLoggedIn: boolean;
}
export class AdministratorRegistrationPage extends React.Component {
    state: AdministratorRegistrationPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
            isAdministratorLoggedIn: true,
            formData:{
                username: '',
                email: '',
                password: '',
            },
        };
    }

    private formInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newFormData = Object.assign(this.state.formData,{
            [ event.target.id ]: event.target.value,
        })

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });
    
        this.setState(newState);
    }
    private setLoginState(isAdministratorLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isAdministratorLoggedIn: isAdministratorLoggedIn,
        });
        this.setState(newState);
     }

     

    render() {
        if (this.state.isAdministratorLoggedIn === false) {
            return (
                <Redirect to="/administrator/login" />
            );
        }
        return (
            <Container>
                <RoleMainMenu role='administrator'/>
             <Col md={{span:8,offset:2}}>
               <Card className="mt-3">
                  <Card.Body>
                     <Card.Title>
                            <FontAwesomeIcon icon={faUsers} /> Administrator Registration
                     </Card.Title>
                     {
                         (this.state.isRegistrationComplete === false) ?  this.renderForm() :
                            this.renderRegistrationCompleteMessage()
                     }
                   </Card.Body>
                </Card>
             </Col>
        </Container>
        );
    }
    private renderForm() {
        if (this.state.isAdministratorLoggedIn === false) {
            return (
                <Redirect to="/administrator/login" />
            );
        }
        return (
            <>
                <Form>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="email">E-mail:</Form.Label>
                            <Form.Control placeholder="E-mail Address"
                                          type="email" id="email"
                                          value ={ this.state.formData.email } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <Form.Control placeholder="Password"
                                          type="password" id="password" 
                                          value ={ this.state.formData.password } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="username">Username:</Form.Label>
                            <Form.Control placeholder="Username"
                                          type="text" id="username"
                                          value ={ this.state.formData.username } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                    </Row>
                            <Form.Group>
                                   <Button variant="primary"
                                           className= "btn-block"
                                           onClick={ () =>  this.doAdministratorRegistration() }>
                                    <FontAwesomeIcon icon={faUsers} /> Administrator Registration
                                    </Button>
                            </Form.Group>
                        </Form>
                        <Alert variant="danger"
                           className={ this.state.errorMessage ? '' : 'd-none'} >
                                     { this.state.errorMessage }
                        </Alert>
                        </>
        );

    }

    private renderRegistrationCompleteMessage() {
        return(
            <p>
                Tha accaunt has been registered.<br />
                <Link to="/administrator/login">Click Here</Link>To goto the Administrator Login page.
            </p>
        );
    }

    private doAdministratorRegistration() {
        const data = {
            email: this.state.formData?.email,
            password: this.state.formData?.password,
            username: this.state.formData?.username,
        };
        api('api/administrator/registeradministrator/','put',data,'administrator')
        .then((res: ApiResponse) => {
            console.log(res);
            if(res.status === 'error' && res.data.response.data.statusCode === 500 ) {
                this.setLoginState(false);
                return;
            }
            if(res.status === 'error' && res.data.response.status === 403 ) {
                this.setErrorMessage('Admidinsrator must login to use this funktion!?');
                this.setLoginState(false);
                return;
            }
            if(res.status === 'error') {
                this.setErrorMessage('Wrong Input In E-mail Or Username Fild??..Try Again!?');
                return;
            }
            if(res.status === 'ok' && res.data.statusCode !== undefined) {
                let message = '';
                switch (res.data.statusCode) {
                    case -1001: message = 'Not Is Wrong Administrator Whit Same Username Or Email All Redy Exist'; break;
                   
                }
                this.setErrorMessage(message);
                return;
            }
            this.registrationComplite();

        })
    }
    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            errorMessage: message,
        });
        this.setState(newState);
    }
    
     private handleErrorMessage(data: any) {
         let message = '';

         switch(data.statusCode) {
             case -1001: message = "Not Is Wrong Administrator Whit Same Username All Redy Exist"; break;
         }
         this.setErrorMessage(message);
     }
     private registrationComplite(){
         const newState = Object.assign(this.state, {
             isRegistrationComplete: true,
         });
         this.setState(newState);
     }
     componentWillMount(){
         this.getMyData();
     }
     componentWillUpdate(){
         this.getMyData();
     }
     private getMyData(){
     api('api/administrator/id','get',{},'administrator')
     .then((res: ApiResponse) => {
        console.log(res);
        if (res.status === 'error' || res.status === 'login') {
            this.setLoginState(false);
            return;
        }
     });
     }
}