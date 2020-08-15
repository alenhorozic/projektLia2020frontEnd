import React from 'react';
import AccauntType from '../../types/AccauntType';
import api, { ApiResponse } from '../../api/api';
import { Redirect, Link, } from 'react-router-dom';
import { Col, Container, Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyCheck, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

interface AccauntUserPageState {
    isUserLoggedIn: boolean;
    accaunt:AccauntType[];

}
interface ApiAccauntDto {
    accauntId: number;
    cratedAt: Date;
    accauntNumber: number;
    isActiv: number;
    userId: number;
    accauntName: string;
}
class AccauntUserPage extends React.Component {
    state: AccauntUserPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            accaunt:[],
        };
    }
    componentWillMount() {
        this.getAccaunt();
    }


    private setLoginState(isUserLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isUserLoggedIn,
        });
        this.setState(newState);
     }

    private getAccaunt() {
        api('api/accaunt/user','get',{})
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
        const accaunt: AccauntType[] = data.map(accaunt => {
            return {
               accauntId: accaunt.accauntId,
               cratedAt: accaunt.cratedAt,
               accauntNumber: accaunt.accauntNumber,
               isActiv: accaunt.isActiv,
               userId: accaunt.userId,
               accauntName: accaunt.accauntName,
            };
        });
        const newState = Object.assign(this.state, {
            accaunt: accaunt,
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
          <Row>
              {this.state.accaunt.map(this.singelAccaunt)}
          </Row>
          <Card.Title>
              <FontAwesomeIcon icon={faUser} /> This is Accaunt User Page 
          </Card.Title>
          <Card.Text>
                <p>Welcome to the User Home Page ......</p>
                <p>As an User, you get access to functions in this application that are intended for logged-in User, e.g. register a new Accaunt and much more ......................</p>
          </Card.Text>
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
            <Col>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon icon={faMoneyCheck} /> Accaunt
                    </Card.Title>
                    <Card.Text>
                     <p>ID: { accaunt.accauntId}</p>
                     <p>name: { accaunt.accauntName} </p>
                     <p>AccauntNumber: { accaunt.accauntNumber} </p>
                     <p>Is Activ: { accaunt.isActiv} </p>
                     <p>Created: { accaunt.cratedAt} </p>
                    </Card.Text>
                    <Link to={`/accaunt/${ accaunt.accauntId}`}
                      className="btn btn-primary btn-block">
                      Go To Accaunt Detals
                    </Link>
                </Card.Body>
            </Card>
            </Col>
        );
    }

}


export default AccauntUserPage;