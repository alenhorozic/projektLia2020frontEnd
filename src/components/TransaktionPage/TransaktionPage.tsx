import React from 'react';
import api, { ApiResponse } from '../../api/api';
import { Redirect, } from 'react-router-dom';
import { Col, Container, Card, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyCheck, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import TransaktionType from '../../types/TransaktionType';

interface TransaktionPageState {
    isUserLoggedIn: boolean;
    transaktion:TransaktionType[];
}

interface ApiTransaktionDto {
    transaktionId: number;
    createdAt: string;
    transaktionTypeId: number;
    amount: number;
    userId: number; 
    accauntId: number;
    transaktionType:{
        transaktionTypeId?: number;
        name?: string;
    }
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
                transaktionId: transaktion.transaktionId,
                userId : transaktion.userId,
                transaktionTypeId: transaktion.transaktionTypeId,
                accauntId: transaktion.accauntId,
                transaktionType: {
                    transaktionTypeId: transaktion.transaktionType.transaktionTypeId,
                    name: transaktion.transaktionType.name,
                }
            };
        });
        const newState = Object.assign(this.state, {
            transaktion: transaktion,
        });
        this.setState(newState);
        console.log(transaktion);
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
          <Col lg="12" md="12" sm="12" xs="12">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon icon={faMoneyCheck} /> Transaktions For Your Accaunt
                    </Card.Title>
                    <Table hover size ="sm">
                        <thead>
                            <tr>
                                <th>Transaktion ID</th>
                                <th>CreatedAt</th>
                                <th>Amount: kr</th>
                                <th>Deposit/Whitdraw</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.transaktion.map(tr =>{
                                 return(
                                    <tr>
                                    <td>{tr.transaktionId}</td>
                                    <td>{tr.createdAt}</td>
                                    <td>{tr.amount} kr</td>
                                    <td>{tr.transaktionType?.name}</td>
                                        </tr>
                                 )
                            },this)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Col>
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
    
}