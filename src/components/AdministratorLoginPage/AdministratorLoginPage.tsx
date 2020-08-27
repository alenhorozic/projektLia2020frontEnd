import React from 'react';
import { Container, Card, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { faSignInAlt, faUser, faPassport }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import apiAdministrator, { ApiResponse, saveToken, saveRefreshToken } from '../../api/apiAdministrator';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface AdministratorLoginPageState {
    username: string;
    password: string;
    errorMessage: string;
    isLoggedIn: boolean;
}

export default class AdministratorLoginPage extends React.Component{
    state: AdministratorLoginPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            isLoggedIn: false,
        }
    }

 private formInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = Object.assign(this.state, {
        [ event.target.id ]: event.target.value,
    });

    this.setState(newState);
 }

 private setErrorMessage(message: string) {
    const newState = Object.assign(this.state, {
        errorMessage: message,
    });
    this.setState(newState);
 }

 private setLoginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
        isLoggedIn: isLoggedIn,
    });
    this.setState(newState);
 }

 private doLogin() {
    apiAdministrator(
        'auth/administrator/login',
        'post',
        {
        username: this.state.username,
        password: this.state.password,
    }
    )
    .then((res: ApiResponse) => {
        
        if (res.status === 'error') {
           this.setErrorMessage('System error........Undefined username! or Wrong password!?');
            return;
        }

        if (res.status === 'ok') {
            if(res.data.statusCode !== undefined){
                let message = '';
                switch (res.data.statusCode) {
                    case -3005: message = 'Undefined Username'; break;
                    case -3006: message = 'Wrong password!'; break;
                }
                this.setErrorMessage(message);
                
                return;
            }
            saveToken(res.data.token);
            saveRefreshToken(res.data.refreshToken);

            this.setLoginState(true);
        }
    });
 }

    render() {
        if (this.state.isLoggedIn === true) {
            return (
                <Redirect to="/administrator/administratorhomepage" />
            );
        }
        return (
            <Container>
                <RoleMainMenu role='visitor'/>
             <Col md={{span:6,offset:3}}>
               <Card className="mt-3">
                  <Card.Body>
                     <Card.Title>
                             <FontAwesomeIcon icon={faSignInAlt} /> This is Administrator login  Page
                     </Card.Title>
                       <Form>
                            <Form.Group>
                            <Form.Label htmlFor="username">UserName:</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                              </InputGroup.Prepend>
                            <Form.Control placeholder="Your UserName"
                                          type="username" id="username"
                                          value ={ this.state.username } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </InputGroup>              
                            </Form.Group>
                            <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><FontAwesomeIcon icon={faPassport} /></InputGroup.Text>
                              </InputGroup.Prepend>
                            <Form.Control placeholder="Your Password"
                                          type="password" id="password" 
                                          value ={ this.state.password } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </InputGroup>              
                            </Form.Group>
                            <Form.Group>
                                   <Button variant="primary"
                                           onClick={ () => this.doLogin() }>
                                    Log in
                                    </Button>
                            </Form.Group>
                        </Form>
                        <Alert variant="danger"
                           className={ this.state.errorMessage ? '' : 'd-none'} >
                                     { this.state.errorMessage }
                        </Alert>
                    </Card.Body>
                </Card>
             </Col>
            </Container>
        );
    }
}