import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { faPhone }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default class ContactPage extends React.Component{
    render() {
        return (
            <Container>
            <Card>
              <Card.Body>
                  <Card.Title>
                      <FontAwesomeIcon icon={faPhone} /> This is Contact Page
                  </Card.Title>
                  <Card.Text>
                      Contact Details will be show here .......
                  </Card.Text>
              </Card.Body>
            </Card>
            </Container>
        );
    }
}