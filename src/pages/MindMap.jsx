import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import Nodes from '../components/Nodes';

import '../index.css';

const MindMap = () => {
  return (
    <Container fluid>
      <Navigation />
      <Container>
        <Row>
          <Col sm={9}>
            <Nodes />
          </Col>
          <Col sm={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MindMap;
