import React from 'react';
import './NodesPanel.css';
import { BiMessageRoundedDetail } from "react-icons/bi";

const NodesPanel = () => {
  // Drag and Generate a new node
  // Set node type for dragging
  const onDragGenerateNewNode = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      <div
        className="nodes"
        onDragStart={(event) => onDragGenerateNewNode(event, 'textNode')}
        draggable
      >
        <BiMessageRoundedDetail style={{ fontSize: '35px' }}/>
        Message
      </div>
    </div>
  );
};

export default NodesPanel;