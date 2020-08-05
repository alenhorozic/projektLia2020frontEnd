import React from 'react';
import { Container, Col, Card, Form, Button, Alert, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/apiAdministrator';

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
}
export class UserRegistrationPage extends React.Component {
    state: UserRegistrationPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
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

    render() {
        return (
        <Container>
             <Col md={{span:8,offset:2}}>
               <Card>
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
        return (
            <>
                <Form>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="email">E-mail:</Form.Label>
                            <Form.Control type="email" id="email"
                                          value ={ this.state.formData.email } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <Form.Control type="password" id="password" 
                                          value ={ this.state.formData.password } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="forname">Forname:</Form.Label>
                            <Form.Control type="text" id="forname"
                                          value ={ this.state.formData.forname } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="surname">Surname:</Form.Label>
                            <Form.Control type="text" id="surname" 
                                          value ={ this.state.formData.surname } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                    </Row>
                            <Form.Group>
                            <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
                            <Form.Control type="phone" id="phoneNumber" 
                                          value ={ this.state.formData.phoneNumber } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                            <Form.Group>
                                   <Button variant="light"
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
        api('api/administrator/registeruser/','put',data)
        .then((res: ApiResponse) => {
            console.log(res);
            if(res.status === 'login') {
                this.setErrorMessage('Admidinsrator must login to use this funktion!?');
                return;
            }
            if(res.status === 'error' && res.data.response.status === 403 ) {
                this.setErrorMessage('Admidinsrator must login to use this funktion!?');
                return;
            }
            if(res.status === 'error') {
                this.setErrorMessage('System error...Wrong Input Feld....Try Again!?');
                return;
            }
            if(res.status === 'ok' && res.data.statusCode !== undefined) {
                let message = '';
                switch (res.data.statusCode) {
                    case -1001: message = 'Not Is Wrong user Whit Same email Or phoneNumber All Redy Exist'; break;
                   
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
}