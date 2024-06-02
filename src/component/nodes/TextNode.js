import React from 'react';
import { Handle } from 'reactflow';
import { BiMessageRoundedDetail, BiLogoWhatsapp } from "react-icons/bi";
import './TextNode.css';

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
     
     {/*header of node start from here */}
       <div className="node-head"> 
        <span className="head-icon head-left-icon"><BiMessageRoundedDetail/></span>
        <span className="node-title">Send Message</span>
        <span className="head-icon head-right-icon"><BiLogoWhatsapp/></span>
      </div>
      
       {/* Node message */}
      <div className="node-message">
        {data.label}
      </div>
      
      {/* connection between nodes */}
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

export default TextNode;