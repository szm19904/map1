import React, {useState, useEffect} from 'react';
import nodesData from '../data/nodes.json';
import edgesData from '../data/edges.json';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';

const buildTree = (nodes, edges) => {
  const nodesDict = nodes.reduce((acc, node) => {
    acc[node.id] = {...node, children: []};
    return acc;
  }, {});

  edges.forEach((edge) => {
    if (nodesDict[edge.from] && nodesDict[edge.to]) {
      nodesDict[edge.from].children.push(nodesDict[edge.to]);
    }
  });

  return nodesDict[1];
};

const Node = ({nodeData, selectNode}) => {
  const [showChildren, setShowChildren] = useState(false);
  const [selectedNode, setSelectedNode] = useState();

  return (
    <Row>
      {nodeData.children && nodeData.children.length > 0 && (
        <center>
          <Button
            variant={showChildren ? 'primary' : 'light'}
            onClick={() => setShowChildren(!showChildren)}
            style={{textAlign: 'center', marginBottom: '1rem'}}
          >
            {nodeData.label}
          </Button>
        </center>
      )}
      {showChildren && (
        <Col xs={nodeData.children.length && 12 / nodeData.children.length}>
          {nodeData.children.map((child) => (
            <Node
              key={child.id}
              nodeData={child}
              selectNode={() => selectNode(child)}
            />
          ))}
        </Col>
      )}
    </Row>
  );
};

const Nodes = () => {
  const [treeData, setTreeData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const tree = buildTree(nodesData, edgesData);
    setTreeData(tree);
  }, []);

  console.log(selectedNode);

  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            {treeData ? (
              <Node
                nodeData={treeData}
                selectNode={(e) => setSelectedNode(e)}
              />
            ) : (
              <p>Loading tree data...</p>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Nodes;
