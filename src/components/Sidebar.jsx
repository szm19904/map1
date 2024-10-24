import React from 'react';
import { ListGroup } from 'react-bootstrap'; 

const Sidebar = ({ selectedNode }) => {
  if (!selectedNode) {
    return <p><i>Select a node to see details</i></p>;  
  }

  const { label, citation, children } = selectedNode; 

  return (
    <div>
      <h3><b>{label}</b></h3>
      <p>{citation}</p>
      <h4><b>Next Options:</b></h4>
      <ListGroup>
        {children && children.length > 0 ? (
          children.map((child) => (
            <ListGroup.Item key={child.id}>{child.label}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No further options</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default Sidebar;