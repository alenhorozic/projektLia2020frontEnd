import React from "react";
import CommingTransaktionType from "../../types/CommingTransaktionType";
import api, { ApiResponse } from '../../api/api';
import { Redirect } from "react-router-dom";
import { Container, Card, Row, Col, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMoneyCheck, faPlus, faMoneyBillAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import RoleMainMenu from "../RoleMainMenu/RoleMainMenu";

interface CommingTransaktionPageState {
    isUserLoggedIn: boolean;
    commingTransaktion:CommingTransaktionType[];

    addModal: {
        visible:boolean;
        accauntId: number;
        amount: number;
        transaktionAt:string;
        transaktionToAccauntNumber:number;
        status:string,
        userId: number,
        message: string;
    };
}

interface ApiCommingTransaktionDto {
    accauntId: number;
    amount: number;
    transaktionAt: string;
    transaktionToAccauntNumber: number;
    status: string;
    userId: number;
    commingTransaktionId: number;
    createdAt: string;
    accauntType:{
        accauntId?: number;
        cratedAt?: string;
        accauntNumber?: number;
        isActiv?: number;
        userId?: number;
    };
    userType:{
        userId?: number;
        email?: string;
        forname?: string;
        surname?: string;
        phoneNumber?: string;
    };
}

interface CommingTransaktionPageProperties {
    match:{
        params:{
            id:number;
        }
    }
}

export default class CommingTransaktionPage extends React.Component<CommingTransaktionPageProperties>{
        state: CommingTransaktionPageState;
  constructor(props: Readonly<CommingTransaktionPageProperties>) {
      super(props);

      this.state = {
          isUserLoggedIn: true,
          commingTransaktion:[],

          addModal: {
              visible: false,
              accauntId: 0,
              amount: 0,
              transaktionAt:'',
              transaktionToAccauntNumber:0,
              status:"weiting",
              userId: 0,
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
        this.getCommingTransaktion()
    }
    
    private setLoginState(isUserLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isUserLoggedIn,
        });
        this.setState(newState);
    }

    private getCommingTransaktion() {
        api('api/commingTransaktion','get',{},'user')
        .then((res: ApiResponse) =>{
            if (res.status === 'error' || res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            this.putCommingTransaktionInState(res.data);
            console.log(res);
        });
    }
     
    private putCommingTransaktionInState(data: ApiCommingTransaktionDto[]) {
        data = Array.from(data)
        const commingTransaktion: CommingTransaktionType[] = data.map(commingTransaktion => {
            return {
                accauntId: commingTransaktion.accauntId,
                amount: commingTransaktion.amount,
                transaktionAt: commingTransaktion.transaktionAt,
                transaktionToAccauntNumber: commingTransaktion.transaktionToAccauntNumber,
                status: commingTransaktion.status,
                userId: commingTransaktion.userId,
                commingTransaktionId: commingTransaktion.commingTransaktionId,
                createdAt: commingTransaktion.createdAt,
                accauntType: {
                    accauntId: commingTransaktion.accauntType?.accauntId,
                    cratedAt: commingTransaktion.accauntType?.cratedAt,
                    accauntNumber: commingTransaktion.accauntType?.accauntNumber,
                    isActiv: commingTransaktion.accauntType?.isActiv,
                    userId: commingTransaktion.accauntType?.userId,
                },
                userType: {
                    userId: commingTransaktion.userType?.userId,
                    email: commingTransaktion.userType?.email,
                    forname: commingTransaktion.userType?.forname,
                    surname: commingTransaktion.userType?.userId,
                    phoneNumber: commingTransaktion.userType?.phoneNumber,
                }
            };
        });
        const newState = Object.assign(this.state, {
            commingTransaktion: commingTransaktion,
        });
        this.setState(newState);
        console.log(commingTransaktion);
    }

    private calculateSum(): number {
        let sum: number = 0;
        if( this.state.commingTransaktion === undefined){
            return sum;
        }
        else {
        for(const item of this.state.commingTransaktion) {
            const status:string = String( item.status)
            const amountCommingTransaktion:number = Number( item.amount );
            if(status === 'weiting'){
                sum=sum+amountCommingTransaktion;
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
              <FontAwesomeIcon icon={faUser} /> This is CommingTransaktion Accaunt Page 
          </Card.Title>
          <Card.Text>
                <p>Welcome to the CommingTransaktion Accaunt Page ......</p>
          </Card.Text>
          <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon icon={faMoneyCheck} /> CommingTransaktions For Your Accaunt
                    </Card.Title>
                    <Card.Title>
                      CommingTransaktion Total: {sum}kr
                    </Card.Title>
                    <Table hover size ="sm" bordered>
                        <thead>
                            <tr>
                                <th colSpan={6}>
                                </th>
                                <th>
                                    <Button variant="primary" size="sm"
                                        onClick={()=>this.showAddModal()}>
                                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> ADD 
                                    </Button>
                                </th>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>CreatedAt</th>
                                <th>Amount: kr</th>
                                <th>TransaktionAt</th>
                                <th>ToAccaunt</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.commingTransaktion.map(tr =>{
                                 return(
                                    <tr>
                                    <td>{tr.commingTransaktionId}</td>
                                    <td>{tr.createdAt?.substring(0,10)}</td>
                                    <td>{tr.amount} kr</td>
                                    <td>{tr.transaktionAt?.substring(0,10)}</td>
                                    <td>{tr.transaktionToAccauntNumber}</td>
                                    <td>{tr.status}</td>
                                    <td>
                                        <Button size="sm" variant="danger"
                                        onClick={() => this.deliteCommingTransaktion(tr.commingTransaktionId)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </td>
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
              <Modal.Title>ADD New CommingTransaktion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form.Group>
                  <Form.Label htmlFor="accauntId">Accaunt Id</Form.Label>
                  <Form.Control id="accauntId" as="select" value={this.state.addModal.accauntId.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("accauntId",e.target.value)}>
                      <option value={0}>
                              {"choise accauntId"}
                          </option>
                      {this.state.commingTransaktion.map(tr=>(
                          <option value={tr.accauntId?.toString()}>
                              {tr.accauntId}
                          </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="amount">Amount</Form.Label>
                  <Form.Control id="amount" type="number" value={this.state.addModal.amount.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("amount",e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="transaktionAt">TransaktionAt</Form.Label>
                  <Form.Control id="transaktionAt" type="date" value={this.state.addModal.transaktionAt.toString()}
                  onChange={(e) =>this.setAddModalStringFildState("transaktionAt",e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="transaktionToAccauntNumber">TransaktionToAccauntNumber</Form.Label>
                  <Form.Control id="transaktionToAccauntNumber" type="number" value={this.state.addModal.transaktionToAccauntNumber.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("transaktionToAccauntNumber",e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <Form.Control id="status" as="select" value={this.state.addModal.status.toString()}
                  onChange={(e) =>this.setAddModalStringFildState("status",e.target.value)}>
                      <option value='weiting'>
                              {"weiting"}
                          </option>
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="userId">User Id</Form.Label>
                  <Form.Control id="userId" as="select" value={this.state.addModal.userId.toString()}
                  onChange={(e) =>this.setAddModalNumberFildState("userId",e.target.value)}>
                      <option value={0}>
                              {"choise userId"}
                          </option>
                      {this.state.commingTransaktion.map(tr=>(
                          <option value={tr.userId?.toString()}>
                              {tr.userId}
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
        this.setAddModalNumberFildState("accauntId",0);
        this.setAddModalNumberFildState("amount",0);
        this.setAddModalStringFildState("transaktionAt",'');
        this.setAddModalNumberFildState("transaktionToAccauntNumber",0);
        this.setAddModalStringFildState('status','weiting');
        this.setAddModalNumberFildState("userId",0);
        this.setAddModalStringFildState('message','');
        this.setAddModalVisibleState(true);
        this.getCommingTransaktion()
    }
    private doAddTransaktion(){
        api('api/commingTransaktion','post',{
            accauntId: this.state.addModal.accauntId,
            amount: this.state.addModal.amount,
            transaktionAt: this.state.addModal.transaktionAt,
            transaktionToAccauntNumber: this.state.addModal.transaktionToAccauntNumber,
            status: this.state.addModal.status,
            userId: this.state.addModal.userId,
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
            this.getCommingTransaktion();
        });
    }

    private deliteCommingTransaktion(commingTransaktionId?:number){
        if(!window.confirm('Are You Sure?????')){
            return;
        }
        api('api/commingTransaktion/'+commingTransaktionId,'delete',{},'user')
        .then((res:ApiResponse)=>{
            if (res.status === 'error' || res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            this.getCommingTransaktion();
        });
    }
}