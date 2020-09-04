import React from 'react';
import AccauntType from '../../types/AccauntType';
import api, { ApiResponse } from '../../api/api';
import { Redirect, Link, } from 'react-router-dom';
import { Col, Container, Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyCheck, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface AccauntUserPageState {
    isUserLoggedIn: boolean;
    accaunt:AccauntType[];
}

interface ApiAccauntDto {
    accauntId: number;
    cratedAt: string;
    accauntNumber: number;
    isActiv: number;
    userId: number;
    accauntName: string;
      user:{
        userId?: number;
        email?: string;
        forname?: string;
        surname?: string;
        phoneNumber?: string;
    }
}

interface AccauntUserPageProperties {
    match:{
        params:{
            id:number;
        }
    }
}

export default class AccauntUserPage extends React.Component<AccauntUserPageProperties>{
          state: AccauntUserPageState;
    constructor(props: Readonly<AccauntUserPageProperties>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            accaunt:[],
        };
    }
    componentWillMount() {
        this.getAccaunt()
    }
    UNSAFE_componentWillReceiveProps(newProperties: AccauntUserPageProperties) {
        this.getAccaunt()
    }
    
    private setLoginState(isUserLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isUserLoggedIn,
        });
        this.setState(newState);
    }

    private getAccaunt() {
        api('api/accaunt','get',{},'user')
        .then((res: ApiResponse) =>{
            if (res.status === 'error' || res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            this.putAccauntInState(res.data);
            console.log(res);
        });
    }
    private putAccauntInState(data: ApiAccauntDto[]) {
        data = Array.from(data)
        const accaunt: AccauntType[] = data.map(accaunt => {
            return {
               accauntId: accaunt.accauntId,
               cratedAt: accaunt.cratedAt,
               accauntNumber: accaunt.accauntNumber,
               isActiv: accaunt.isActiv,
               userId: accaunt.userId,
               accauntName: accaunt.accauntName,
                 user:{
                     email: accaunt.user.email,
                     phoneNumber: accaunt.user.phoneNumber,
                     forname: accaunt.user.forname,
                     surname: accaunt.user.surname,
                 }
            };
        });
        const newState = Object.assign(this.state, {
            accaunt: accaunt,
            
        });
        this.setState(newState);
        console.log(accaunt);
    }

    render () {
        if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }
        return (
<Container>
<RoleMainMenu role='user'/>
    <Card className="mt-3 mb-3 text-center">
      <Card.Body>
          
          <Card.Title>
              <FontAwesomeIcon icon={faUser} /> This is Accaunt User Page 
          </Card.Title>
          <Card.Text>
                <p>Welcome to the Accaunt User Home Page ......</p>
          </Card.Text>
          <Row>
              {this.state.accaunt.map(this.singelAccaunt)}
          </Row>
          <Row>
            <Col lg="6" md="6" sm="12" xs="12">
              <Card className="mb-3">
                <Card.Body>
                <Card.Title>
                 <FontAwesomeIcon icon={faUser} /> User Registration Page
                </Card.Title>
                
                </Card.Body>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="12" xs="12">
              <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                 <FontAwesomeIcon icon={faMoneyBillAlt} /> Accaunt User Page
                </Card.Title>
                
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
      </Card.Body>
    </Card>
    </Container>
        );
    }
    private singelAccaunt(accaunt: AccauntType) {
        return (
            <Col lg="12" md="12" sm="12" xs="12">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon icon={faMoneyCheck} /> Accaunt ID: { accaunt.accauntId}
                    </Card.Title>
                    <Card.Text>
                     <p>Owner Email: {accaunt.user?.email}</p>
                     <p>Owner ForName: {accaunt.user?.surname} Ovner SurName: {accaunt.user?.forname}</p>
                     <p>Owner PhoneNumber: {accaunt.user?.phoneNumber}</p>
                     <p>AccauntName: { accaunt.accauntName} </p>
                     <p>AccauntNumber: { accaunt.accauntNumber} </p>
                     <p>Is Activ: { accaunt.isActiv} </p>
                     <p>Created: { accaunt.cratedAt?.substring(0,19)} </p>
                    </Card.Text>
                    <Link to={`/transaktion`}
                      className="btn btn-primary btn-block">
                      Go To Accaunt Transaktion Detals
                    </Link>
                </Card.Body>
            </Card>
            </Col>
        );
    }
}
