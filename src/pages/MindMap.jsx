import React, { useState, useEffect } from 'react';
import nodesData from '../data/nodes.json';
import edgesData from '../data/edges.json';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Sidebar from '../components/SideBar';
import Hierarchy from '../components/Node';

import '../index.css';

const MindMap = () => {
  const [currentNode, setCurrentNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState([]);

  console.log('nodes', nodesData);

  useEffect(() => {
    const startNode = nodesData.find(node => node.label === 'Start');
    if (startNode) {
      setCurrentNode(startNode);
      setExpandedNodes([startNode.id]);
    }
  }, []);

  const getNextNodes = (nodeId) => {
    const connectedEdges = edgesData.filter(edge => edge.from === nodeId);
    return connectedEdges.map(edge => {
      const targetNode = nodesData.find(node => node.id === edge.to);
      return { ...targetNode, edgeLabel: edge.label };
    });
  };

  const handleNodeClick = (node) => {
    if (isLeafNode(node)) {
      alert(`Tool: ${node.label} selected!`);
      return;
    }

    if (expandedNodes.includes(node.id)) {
      setExpandedNodes(expandedNodes.filter(id => id !== node.id));
    } else {
      setExpandedNodes([...expandedNodes, node.id]);
    }

    setCurrentNode(node);
  };

  const isLeafNode = (node) => {
    return !edgesData.some(edge => edge.from === node.id);
  };

  if (!currentNode) {
    return <p>Loading...</p>;
  }

  const nextNodes = getNextNodes(currentNode.id);

  return (
    <Container>
      <Navigation />
      <Container>
        <Row>
          <Col md={9}>
            {/* <h1
              style={{ cursor: 'pointer' }}
              onClick={() => handleNodeClick(currentNode)}
            >
              {currentNode.label}
            </h1>

            {expandedNodes.includes(currentNode.id) && nextNodes.length > 0 && (
              <div className="node-container">
                {nextNodes.map(node => (
                  <div
                    key={node.id}
                    className={`cell ${isLeafNode(node) ? 'leaf' : 'branch'} node`}
                    onClick={() => handleNodeClick(node)}
                  >
                    {node.label}
                    {node.edgeLabel && (
                      <span style={{ marginLeft: '10px' }}>({node.edgeLabel})</span>
                    )}
                  </div>
                ))}
              </div>
            )} */}
            <Hierarchy />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
        </Row>
      </Container>
      
    </Container>
    
  );
};

export default MindMap;
