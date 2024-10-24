import React, { useState } from "react";

// Recursive component to render a node and its children
const Node = ({ nodeData, onAddChild, onRemoveNode }) => {
  const [showChildren, setShowChildren] = useState(false); // State to control visibility of children

  return (
    <div style={{ marginLeft: "20px", border: "1px solid black", padding: "10px" }}>
      <p>{nodeData.name}</p>
      <button
        onClick={() => {
          onAddChild(nodeData.id);
          setShowChildren(true); // Show children when the button is clicked
        }}
      >
        Add Children
      </button>
      {nodeData.parentId !== null && (
        <button onClick={() => onRemoveNode(nodeData.id)}>Remove</button>
      )}
      <div>
        {showChildren &&
          nodeData.children.map((child) => (
            <Node
              key={child.id}
              nodeData={child}
              onAddChild={onAddChild}
              onRemoveNode={onRemoveNode}
            />
          ))}
      </div>
    </div>
  );
};

const Hierarchy = () => {
  // Initial data for hierarchy
  const initialData = {
    id: 1,
    name: "Root",
    parentId: null,
    children: []
  };

  // State to manage the hierarchy
  const [treeData, setTreeData] = useState(initialData);

  // Function to handle adding two new children to a node
  const handleAddChild = (parentId) => {
    const newChildren = [
      {
        id: Math.random(),
        name: `Node ${Math.floor(Math.random() * 1000)}`,
        parentId: parentId,
        children: []
      },
      {
        id: Math.random(),
        name: `Node ${Math.floor(Math.random() * 1000)}`,
        parentId: parentId,
        children: []
      }
    ];

    const addNewChildren = (node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, ...newChildren], // Create new children array
        };
      }
      return {
        ...node,
        children: node.children.map((child) => addNewChildren(child)), // Recursively map over children
      };
    };

    setTreeData((prevTreeData) => addNewChildren(prevTreeData));
  };
gir
  // Function to handle removing a node
  const handleRemoveNode = (id) => {
    const removeNodeById = (node, idToRemove) => {
      return {
        ...node,
        children: node.children
          .filter((child) => child.id !== idToRemove) // Remove child by ID
          .map((child) => removeNodeById(child, idToRemove)), // Recursively map over children
      };
    };

    setTreeData((prevTreeData) => removeNodeById(prevTreeData, id));
  };

  return (
    <div>
      <h2>Hierarchy of Nodes</h2>
      <Node nodeData={treeData} onAddChild={handleAddChild} onRemoveNode={handleRemoveNode} />
    </div>
  );
};

export default Hierarchy;
