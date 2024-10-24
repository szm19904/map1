import React from 'react';
import {ListGroup, Card} from 'react-bootstrap';

const Sidebar = ({selectedNode}) => {
  return (
    <Card>
      <Card.Body>
        <i>Select a node to see details</i>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
