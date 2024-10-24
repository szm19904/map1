import React, { useState, useEffect } from "react";
import nodesData from '../data/nodes.json';
import edgesData from '../data/edges.json';
import Sidebar from './SideBar';  

const buildTree = (nodes, edges) => {
  const nodesDict = nodes.reduce((acc, node) => {
    acc[node.id] = { ...node, children: [] };
    return acc;
  }, {});

  edges.forEach((edge) => {
    if (nodesDict[edge.from] && nodesDict[edge.to]) {
      nodesDict[edge.from].children.push(nodesDict[edge.to]);
    }
  });

  return nodesDict[1]; 
};

const Node = ({ nodeData, onSelect }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div style={{ marginLeft: "20px", border: "1px solid black", padding: "10px", backgroundColor: "lightgray", marginTop: "10px", width: "750px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)" }}>
      <p  
        onClick={() => {
          console.log(nodeData.label);
          onSelect(nodeData);  
        }}  
        className="node-label"
      >
        {nodeData.label}
      </p>

      {nodeData.children && nodeData.children.length > 0 && (
        <button onClick={() => setShowChildren(!showChildren)}>
          {showChildren ? "Hide Children" : "Show Children"}
        </button>
      )}
      {showChildren && (
        <div>
          {nodeData.children.map((child) => (
            <Node key={child.id} nodeData={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const Hierarchy = () => {
  const [treeData, setTreeData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const tree = buildTree(nodesData, edgesData);
    setTreeData(tree);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {treeData ? (
          <Node nodeData={treeData} onSelect={setSelectedNode} />
        ) : (
          <p>Loading tree data...</p>
        )}
      </div>
      <div style={{ width: "250px", marginLeft: "20px" }}>
        <Sidebar selectedNode={selectedNode} /> 
      </div>
    </div>
  );
};

export default Hierarchy;