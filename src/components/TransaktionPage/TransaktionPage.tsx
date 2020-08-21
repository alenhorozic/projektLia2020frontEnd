import React from 'react';
import api, { ApiResponse } from '../../api/api';
import { Redirect, } from 'react-router-dom';
import { Col, Container, Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyCheck, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import TransaktionType from '../../types/TransaktionType';

interface TransaktionPageState {
    isUserLoggedIn: boolean;
    transaktion:TransaktionType[];
}

interface ApiTransaktionDto {
    accauntId: number;
    createdAt: string;
    amount: number;
    userId: number;
    accauntName: string;
}

interface TransaktionPageProperties {
    match:{
        params:{
            id:number;
        }
    }
}

export default class TransaktionPage extends React.Component<TransaktionPageProperties>{
          state: TransaktionPageState;
    constructor(props: Readonly<TransaktionPageProperties>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            transaktion:[],
        };
    }
    componentWillMount() {
        this.getTransaktion()
    }
    UNSAFE_componentWillReceiveProps(newProperties: TransaktionPageProperties) {
        this.getTransaktion()
    }
    
    private setLoginState(isUserLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isUserLoggedIn,
        });
        this.setState(newState);
    }

    private getTransaktion() {
        api('api/transaktion','get',{})
        .then((res: ApiResponse) =>{
            if (res.status === 'error' || res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            this.putTransaktionInState(res.data);
            console.log(res);
        });
    }
    private putTransaktionInState(data: ApiTransaktionDto[]) {
        data = Array.from(data)
        const transaktion: TransaktionType[] = data.map(transaktion => {
            return {
                createdAt: transaktion.createdAt,
                amount: transaktion.amount,
                transaktionId: transaktion.accauntId,
                accauntId: transaktion.accauntId,
                transaktionTypeId : transaktion.userId,
               
            };
        });
        const newState = Object.assign(this.state, {
            transaktion: transaktion,
        });
        this.setState(newState);
    }

    render () {
        if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }
        return (
<Container>
    <Card>
      <Card.Body>
          
          <Card.Title>
              <FontAwesomeIcon icon={faUser} /> This is Transaktion Accaunt Page 
          </Card.Title>
          <Card.Text>
                <p>Welcome to the Transaktion Accaunt Page ......</p>
          </Card.Text>
          <Row>
              {this.state.transaktion.map(this.singelTransaktion)}
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
    private singelTransaktion(transaktion: TransaktionType) {
        return (
            <Col lg="12" md="12" sm="12" xs="12">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon icon={faMoneyCheck} /> Transaktion
                    </Card.Title>
                    <Card.Text>
                     <p>AccauntID: {  transaktion.accauntId } Created: { transaktion.createdAt} Amount: { transaktion.amount } </p>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        );
    }
}