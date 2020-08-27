import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect, Link } from 'react-router-dom';
import UserType from '../../types/UserType';
import api, { ApiResponse } from '../../api/api';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface UserHomePageState {
    isUserLoggedIn: boolean;
    user:UserType[];

}

interface ApiUserDto {
    userId: number;
    email: string;
    forname: string;
    surname: string;
    phoneNumber: string;
}

class UserHomePage extends React.Component {
    state: UserHomePageState;
    
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            user:[],
            
        };
    }
    
    componentWillMount() {
        this.getUser();
    }

    private getUser() {
        api('api/user/user','get',{})
        .then((res: ApiResponse) =>{
            if (res.status === 'error' || res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            this.putUserInState(res.data);
        });
    }
    private putUserInState(data: ApiUserDto[]) {
        data = Array.from(data)
        const user: UserType[] = data.map(user => {
            return {
                userId: user.userId,
                email: user.email,
                forname: user.forname,
                surname: user.surname,
                phoneNumber: user.phoneNumber,
            };
        });
        const newState = Object.assign(this.state, {
            user: user,
        });
        this.setState(newState);
    }

    private setLoginState(isUserLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isUserLoggedIn,
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
<RoleMainMenu role='user'/>
    <Card className="mt-3">
      <Card.Body>
          
          <Card.Title>
              <FontAwesomeIcon icon={faHome} /> This is User Home Page 
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
                <Link to='/accaunt'
                className="btn btn-primary btn-block">
                  Go To Accaunt User Page
                </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
              {this.state.user.map(this.singelUser)}
          </Row>
      </Card.Body>
    </Card>
    </Container>
        );
    }
    private singelUser(user: UserType) {
        return (
            <Col>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faUsers} /> User
                    </Card.Title>
                    <Card.Text>
                <p>ID: { user.userId}</p>
                <p>Forname: { user.forname} </p>
                <p>Surname: { user.surname} </p>
                <p>email: { user.email} </p>
                <p>phoneNumber: { user.phoneNumber} </p>
          </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        );
    }
}
export default UserHomePage;