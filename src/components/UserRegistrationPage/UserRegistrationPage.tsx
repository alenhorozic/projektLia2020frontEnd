import React from 'react';
import { Container, Col, Card, Form, Button, Alert, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/apiAdministrator';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface UserRegistrationPageState {
    formData:{
        email: string;
        password: string;
        forname: string;
        surname: string;
        phoneNumber: string;
    };
    errorMessage?: string;
    isRegistrationComplete?: boolean;
    isAdministratorLoggedIn: boolean;
}
export class UserRegistrationPage extends React.Component {
    state: UserRegistrationPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
            isAdministratorLoggedIn: true,
            formData:{
                email: '',
                password: '',
                forname: '',
                surname: '',
                phoneNumber: '',
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
                            <FontAwesomeIcon icon={faUserPlus} /> User Registration
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
                            <Form.Label htmlFor="forname">Forname:</Form.Label>
                            <Form.Control placeholder="Forname"
                                          type="text" id="forname"
                                          value ={ this.state.formData.forname } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="surname">Surname:</Form.Label>
                            <Form.Control placeholder="Surname"
                                          type="text" id="surname" 
                                          value ={ this.state.formData.surname } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                    </Row>
                            <Form.Group>
                            <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
                            <Form.Control placeholder="PhoneNumber"
                                          type="phone" id="phoneNumber" 
                                          value ={ this.state.formData.phoneNumber } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                            <Form.Group>
                                   <Button variant="primary"
                                           className= "btn-block"
                                           onClick={ () =>  this.doUserRegistration() }>
                                    <FontAwesomeIcon icon={faUserPlus} /> User Registration
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
                <Link to="/user/login">Click Here</Link>To goto the user Login page.
            </p>
        );
    }


    private doUserRegistration() {
        const data = {
            email: this.state.formData?.email,
            password: this.state.formData?.password,
            forname: this.state.formData?.forname,
            surname: this.state.formData?.surname,
            phoneNumber: this.state.formData?.phoneNumber,
        };
        api('api/administrator/registeruser/','put',data,'administrator')
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
             case -1001: message = "Not Is Wrong user Whit Same email Or phoneNumber All Redy Exist"; break;
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