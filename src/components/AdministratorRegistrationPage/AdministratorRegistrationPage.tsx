import React from 'react';
import { Container, Col, Card, Form, Button, Alert, Row } from 'react-bootstrap';
import api, { ApiResponse } from '../../api/apiAdministrator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface AdministratorRegistrationPageState {
    formData:{
        username: string;
        email: string;
        password: string;
    };
    errorMessage?: string;

    isRegistrationComplete?: boolean;
}
export class AdministratorRegistrationPage extends React.Component {
    state: AdministratorRegistrationPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
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

    render() {
        return(
            <Container>
             <Col md={{span:8,offset:2}}>
               <Card>
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
                            <Form.Label htmlFor="username">Username:</Form.Label>
                            <Form.Control type="text" id="username"
                                          value ={ this.state.formData.username } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </Form.Group>
                        </Col>
                    </Row>
                            <Form.Group>
                                   <Button variant="light"
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
        api('api/administrator/registeradministrator/','put',data)
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
                    case -1001: message = 'Not Is Wrong Administrator Whit Same Username All Redy Exist'; break;
                   
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
}