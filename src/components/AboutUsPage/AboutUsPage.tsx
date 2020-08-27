import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { faAddressCard }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoleMainMenu from '../RoleMainMenu/RoleMainMenu';



export default class AboutUsPage extends React.Component{
    render() {
        return (
            <Container>
                <RoleMainMenu role='visitor'/>
            <Card className="mt-3">
              <Card.Body>
                  <Card.Title>
              <FontAwesomeIcon icon={faAddressCard} /> This is About Us Page
                  </Card.Title>
                  <Card.Text>
                  About Us Details will be show here .......
                  </Card.Text>
              </Card.Body>
            </Card>
            </Container>
          );
    }
}