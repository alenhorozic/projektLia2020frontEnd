import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import AdministratorType from '../../types/AdministratorType';
import api, { ApiResponse } from '../../api/apiAdministrator';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';

interface AdministratorHomePageState {
    isAdministratorLoggedIn: boolean;
    administrator:AdministratorType[];

}

interface ApiAdministratorDto {
    administratorId: number;
    username: string;
    email: string;
}

class AdministratorHomePage extends React.Component {
    state: AdministratorHomePageState;
    
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isAdministratorLoggedIn: true,
            administrator:[],
            
        };
    }

    componentWillMount() {
        this.getAdministrator();
    }

    componentWillUpdate() {
        this.getAdministrator();
    }

    private getAdministrator() {
        api('api/administrator/administrator','get',{})
        .then((res: ApiResponse) =>{
            if (res.status === 'error' || res.status === 'login') {
                this.setLoginState(false);
                return;
            }
            this.putAdministratorInState(res.data);
        });
    }

    private putAdministratorInState(data: ApiAdministratorDto[]) {
        const administrators: AdministratorType[] | undefined = data?.map(administrator => {
            return {
                administratorId: administrator.administratorId,
                username: administrator.username,
                email: administrator.email,
            };
        });
        const newState = Object.assign(this.state, {
            administrator: administrators,
        });
        this.setState(newState);
    }

    private setLoginState(isAdministratorLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isAdministratorLoggedIn: isAdministratorLoggedIn,
        });
        this.setState(newState);
     }

    render () {
        if (this.state.isAdministratorLoggedIn === false) {
            return (
                <Redirect to="/administrator/login" />
            );
        }
        return (
<Container>
<RoleMainMenu role='administrator'/>
    <Card >
      <Card.Body>
          <Row>
              {this.state.administrator.map(this.singelAdministrator)}
          </Row>
          <Card.Title>
              <FontAwesomeIcon icon={faHome} /> This is Administrator Home Page 
          </Card.Title>
          <Card.Text>
                <p>Welcome to the Administrator Home Page ......</p>
                <p>As an Administrator, you get access to functions in this application that are intended for logged-in Administrators, e.g. register a new User and much more ......................</p>
          </Card.Text>
          <Row>
            <Col lg="6" md="6" sm="12" xs="12">
              <Card className="mb-3">
                <Card.Body>
                <Card.Title>
                 <FontAwesomeIcon icon={faUser} /> User Registration Page
                </Card.Title>
                <Link to='/administrator/registeruser'
                className="btn btn-primary btn-block">
                  Go To User Registration Page
                </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="12" xs="12">
              <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                 <FontAwesomeIcon icon={faUsers} /> Administrator Registration Page
                </Card.Title>
                <Link to='/administrator/registeradministrator'
                className="btn  btn-primary btn-block">
                  Go To Administrator Registration Page
                </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </Card.Body>
    </Card>
    </Container>
        );
    }
    private singelAdministrator(administrator: AdministratorType) {
        return (
            <Col>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faUsers} /> Administrator
                    </Card.Title>
                    <Card.Text>
                <p>ID: { administrator.administratorId}</p>
                <p>Name: { administrator.username} </p>
                <p>email: { administrator.email} </p>
          </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        );
    }
}
export default AdministratorHomePage;
