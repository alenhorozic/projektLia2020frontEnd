import React from 'react';
import { Container, Card, Form, Button, Col, Alert, InputGroup } from 'react-bootstrap';
import { faSignInAlt, faPassport, faAt }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api, { ApiResponse, saveToken, saveRefreshToken } from '../../api/api';
import { Redirect } from 'react-router-dom';

interface UserLoginPageState {
    email: string;
    password: string;
    errorMessage: string;
    isLoggedIn: boolean;
}

export default class UserLoginPage extends React.Component{
    state: UserLoginPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            email: '',
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
    api(
        'auth/user/login',
        'post',
        {
        email: this.state.email,
        password: this.state.password,
    }
    )
    .then((res: ApiResponse) => {
        
        if (res.status === 'error') {
           this.setErrorMessage('System error........Undefined e-mail! or Wrong password!?');
            return;
        }

        if (res.status === 'ok') {
            if(res.data.statusCode !== undefined){
                let message = '';
                switch (res.data.statusCode) {
                    case -3007: message = 'Undefined e-mail!'; break;
                    case -3008: message = 'Wrong password!'; break;
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
                <Redirect to="/user/userhomepage" />
            );
        }
        return (
            <Container>
             <Col md={{span:6,offset:3}}>
               <Card>
                  <Card.Body>
                     <Card.Title>
                             <FontAwesomeIcon icon={faSignInAlt} /> This is User login  Page
                     </Card.Title>
                       <Form>
                            <Form.Group>
                            <Form.Label htmlFor="email">E-mail:</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><FontAwesomeIcon icon={faAt} /></InputGroup.Text>
                              </InputGroup.Prepend>
                            <Form.Control placeholder="Your email Address"
                                          type="email" id="email"
                                          value ={ this.state.email } 
                                          onChange={ event => this.formInputChange( event as any ) } />
                            </InputGroup>
                            </Form.Group>                            
                            <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><FontAwesomeIcon icon={faPassport} /></InputGroup.Text>
                              </InputGroup.Prepend>
                            <Form.Control
                             placeholder="Your Password"
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