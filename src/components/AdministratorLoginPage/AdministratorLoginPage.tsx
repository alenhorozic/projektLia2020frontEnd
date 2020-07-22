import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { faSignInAlt }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default class AdministratorLoginPage extends React.Component{
    render() {
        return (
            <Container>
            <Card>
              <Card.Body>
                  <Card.Title>
              <FontAwesomeIcon icon={faSignInAlt} /> This is Administrator login  Page
                  </Card.Title>
                  <Card.Text>
                  Administrator login page formular .......
                  </Card.Text>
              </Card.Body>
            </Card>
            </Container>
          );
    }
}