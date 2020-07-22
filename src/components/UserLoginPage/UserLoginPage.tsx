import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { faSignInAlt }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default class UserLoginPage extends React.Component{
    render() {
        return (
            <Container>
            <Card>
              <Card.Body>
                  <Card.Title>
              <FontAwesomeIcon icon={faSignInAlt} /> This is User login  Page
                  </Card.Title>
                  <Card.Text>
                  User login page formular
                  </Card.Text>
              </Card.Body>
            </Card>
            </Container>
          );
    }
}