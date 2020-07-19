import React from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import { faHome, faUpload}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function App() {
  return (
    <Container >
      <FontAwesomeIcon icon={faHome} /> Home  <FontAwesomeIcon icon={faUpload} />
    </Container>
  );
}

export default App;
