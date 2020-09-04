import React from 'react';
import api, { ApiResponse } from '../../api/api';
import { Redirect, } from 'react-router-dom';
import { Col, Container, Card, Row, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyCheck, faMoneyBillAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import TransaktionType from '../../types/TransaktionType';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface TransaktionPageState {
    isUserLoggedIn: boolean;
    transaktion:TransaktionType[];

    addModal: {
        visible:boolean;
        transaktionTypeId: number;
        amount: number;
        userId: number; 
        accauntId: number;
        message: string;
    };
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

            addModal: {
                visible: false,
                transaktionTypeId:0,
                amount: 0,
                userId: 0,
                accauntId:0,
                message:'',

            }
        };
    }

    private setAddModalVisibleState(newState:boolean){
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                visible: newState,
            })
        ));
    }

    private setAddModalNumberFildState(fildName: string, newValue: any){
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                [fildName] : Number( newValue )
            })
        ));
    }

    private setAddModalStringFildState(fildName: string, newValue: string){
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                [fildName] :  newValue 
            })
        ));
    }

    componentWillMount() {
        this.getTransaktion()
    }
    
    private setLoginState(isUserLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isUserLoggedIn,
        });
        this.setState(newState);
    }

    private getTransaktion() {
        api('api/transaktion','get',{},'user')
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

    private calculateSum(): number {
        let sum: number = 0;
        if( this.state.transaktion === undefined){
            return sum;
        }
        else {
        for(const item of this.state.transaktion) {
            const typTransaktion:number = Number( item.transaktionType?.transaktionTypeId)
            const amountTransaktion:number = Number( item.amount );
            if(typTransaktion === 1){
                sum=sum+amountTransaktion;
            }
            if(typTransaktion === 2){
                sum=sum-amountTransaktion;
            }
            console.log(item.amount)
        }
        }  
        return sum;
    }

    render () {
        const sum = this.calculateSum();

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
                    <Card.Title>
                      Accaunt Saldo: {sum}kr
                    </Card.Title>
                    <Table hover size ="sm" bordered>
                        <thead>
                            <tr>
                                <th colSpan={3}>
                                </th>
                                <th>
                                    <Button variant="primary" size="sm"
                                        onClick={()=>this.showAddModal()}>
                                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> ADD Transaktion
                                    </Button>
                                </th>
                            </tr>
                            <tr>
                                <th>Transaktion ID</th>
                                <th>CreatedAt</th>
                                <th>Amount: kr</th>
                                <th>Deposit Whitdraw</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.transaktion.map(tr =>{
                                 return(
                                    <tr>
                                    <td>{tr.transaktionId}</td>
                                    <td>{tr.createdAt?.substring(0,19)}</td>
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
                 <FontAwesomeIcon icon={faMoneyCheck} /> ADD New Transaktion
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

      <Modal size="lg" centered show={this.state.addModal.visible}onHide={()=>this.setAddModalVisibleState(false)}>
          <Modal.Header>
              <Modal.Title>ADD New Transaktion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group>
                  <Form.Label htmlFor="transaktionTypeId">TransaktionTypeId</Form.Label>
                  <Form.Control id="transaktionTypeId" as="select" value={this.state.addModal.transaktionTypeId?.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("transaktionTypeId",e.target.value)}>
                      <option value={0}>
                              {"choise service"}
                          </option>
                      <option value={1}>
                              {"deposit"}
                          </option>
                          <option value={2}>
                              {"whitdraw"}
                          </option>
                      ))
                    
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="amount">Amount</Form.Label>
                  <Form.Control id="amount" type="number" value={this.state.addModal.amount.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("amount",e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="userId">User Id</Form.Label>
                  <Form.Control id="userId" as="select" value={this.state.addModal.userId.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("userId",e.target.value)}>
                      <option value={0}>
                              {"choise userId"}
                          </option>
                      {this.state.transaktion.map(tr=>(
                          <option value={tr.userId?.toString()}>
                              {tr.userId}
                          </option>
                      ))}

                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="accauntId">Accaunt Id</Form.Label>
                  <Form.Control id="accauntId" as="select" value={this.state.addModal.accauntId.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("accauntId",e.target.value)}>
                      <option value={0}>
                              {"choise accauntId"}
                          </option>
                      {this.state.transaktion.map(tr=>(
                          <option value={tr.accauntId?.toString()}>
                              {tr.accauntId}
                          </option>
                      ))}
                  </Form.Control>
              </Form.Group>
              {this.state.addModal.message ? (
                  <Alert variant="danger" value={this.state.addModal.message}/>
              ):''}
                <Button className="btn  btn-primary btn-block"
                  onClick={()=>this.doAddTransaktion()}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> ADD Transaktion
                </Button>
          </Modal.Body>
      </Modal>

    </Container>
    );
    }
    private showAddModal(){
        this.setAddModalNumberFildState("transaktionTypeId",0);
        this.setAddModalNumberFildState("amount",0);
        this.setAddModalNumberFildState("userId",0);
        this.setAddModalNumberFildState("accauntId",0);
        this.setAddModalStringFildState('message','');
        this.setAddModalVisibleState(true);
        this.getTransaktion()
    }
    private doAddTransaktion(){
        api('api/transaktion','post',{
            transaktionTypeId: this.state.addModal.transaktionTypeId,
            amount: this.state.addModal.amount,
            userId: this.state.addModal.userId,
            accauntId: this.state.addModal.accauntId,
        },'user')
        .then((res:ApiResponse) =>{
            if (res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            if(res.status === 'error') {
                this.setAddModalStringFildState('message',JSON.stringify(res.data));
                console.log(res.data);
                return;
            }
            this.setAddModalVisibleState(false);
            this.getTransaktion();
        });
    }
}