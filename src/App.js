import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import TextNode from "./component/nodes/TextNode.js";
import NodesPanel from "./component/NodesPanel.js";
import SettingsPanel from "./component/SettingsPanel.js";

// here we are creating intial empty array to store the nodes and edges
const storingNodes = [];
const storingEdges = [];

// Here i defined custom node
const customNodeType = {
  textNode: TextNode,
};

const App = () => {
  // First we mange the state for nodes,edges,select node, select counter, node Id counte, erroor message using react hook
  const [nodes, setNodes, onNodesChange] = useNodesState(storingNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storingEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeCounter, setNodeCounter] = useState(1); // Counter for node labels
  const [nodeIdCounter, setNodeIdCounter] = useState(1); // Counter for node IDs
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Making connection between nodes
  const handleOnConnect = (data) => {
    const existingEdge = edges.find((edge) => edge.source === data.source);
    if (existingEdge) {
      setErrorMessage(
        "A node can not have more than one outgoing edge or connection"
      );
      return;
    }
    setEdges((eds) => addEdge({ ...data, arrowHeadType: "arrow" }, eds));
    setErrorMessage("");
  };

  // Handle node click to select it
  const handleOnNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Handle node label change
  const HandleHandleOnNodeChange = (id, label) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );

    if (selectedNode && selectedNode.id === id) {
      setSelectedNode((prevNode) => ({
        ...prevNode,
        data: { ...prevNode.data, label },
      }));
    }
  };

  // Dropping a new node onto the canvas Handle dropping a new node onto the canvas
  const HandleOnDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: nodeIdCounter.toString(), // Set node ID using counter
      type,
      position,
      data: { label: `text message ${nodeCounter}` }, // Set label using counter
    };

    setNodes((nds) => nds.concat(newNode));
    setNodeCounter(nodeCounter + 1); // Increment message counter
    setNodeIdCounter(nodeIdCounter + 1); // Increment node ID counter
    setErrorMessage(""); // Clear error message on successful drop
  };

  // Handle drag over the canvas
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Validate the flow before saving
  const validateFlow = () => {
    if (nodes.length <= 1) return true; // If there's only one node, it's valid

    for (let node of nodes) {
      const outgoingEdges = edges.filter((edge) => edge.source === node.id);
      const incomingEdges = edges.filter((edge) => edge.target === node.id);
      if (outgoingEdges.length === 0 && incomingEdges.length === 0) {
        setErrorMessage("Cannot save Flow"); // If any node has no connections, show error
        return false;
      }
    }
    setErrorMessage(""); // Clear error message if all nodes are connected
    return true;
  };

  // Save the flow if it's valid
  const saveFlow = () => {
    if (validateFlow()) {
      console.log("Flow saved!", { nodes, edges });
    }
  };

  // Handle going back from node settings
  const handleBack = () => {
    setSelectedNode(null);
  };

  return (
    // this hole app container
    <div className="main-container">
     {/* App heading */}
      <div className="app-header">
        {/* here we are showing error when user try to make more than one output from a node */}
        {errorMessage && <span className="error-message">{errorMessage}</span>}
        <button onClick={saveFlow}>Save Changes</button>
      </div>
      <ReactFlowProvider>
        <div className="app-container">
          <div
            className="react-flow-container"
            onDrop={HandleOnDrop}
            onDragOver={onDragOver}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleOnConnect}
              nodeTypes={customNodeType}
              onNodeClick={handleOnNodeClick }
              grid
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onChange={HandleHandleOnNodeChange}
              onBack={handleBack}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
