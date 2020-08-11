import React from 'react';
import {Container, Card, Row, Col} from 'react-bootstrap';
import { faHome, faUser, faUsers}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container>
    <Card>
      <Card.Body>
          <Card.Title>
              <FontAwesomeIcon icon={faHome} /> This is Home Page
          </Card.Title>
          <Card.Text>
                <p>Welcome to the Home Page .......</p>
                <p>As a User, you get access to functions in this Application that are intended for logged-in Users, e.g. Users can do their banking business via this Application</p>
                <p>As an Administrator, you get access to functions in this application that are intended for logged-in Administrators, e.g. register a new User and much more ......................</p>
          </Card.Text>
          <Row>
            <Col lg="6" md="6" sm="12" xs="12">
              <Card className="mb-3">
                <Card.Body>
                <Card.Title>
                 <FontAwesomeIcon icon={faUser} /> User Home Page
                </Card.Title>
                <Link to='/user/userhomepage'
                className="btn btn-primary btn-block">
                  Go To User Home Page
                </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="12" xs="12">
              <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                 <FontAwesomeIcon icon={faUsers} /> Administrator Home Page
                </Card.Title>
                <Link to='/administrator/administratorhomepage'
                className="btn  btn-primary btn-block">
                  Go To Administrator Home Page
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

export default HomePage;
