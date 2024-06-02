import React, { Component } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./SettingsPanel.css";

const SettingsPanel = ({ selectedNode, onChange, onBack }) => {
  // if there is no node text area is selceted than this Component will not rener
  if (!selectedNode) return null;

  const handleOnChange = (e) => {
    const { value } = e.target;
    onChange(selectedNode.id, value);
  };

  return (
    <div className="settings-panel">
      <div className="back-area">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <span>Messages</span>
      </div>

      <div className="text-edit">
        <label>Text </label>
        <textarea
          className="message-box"
          value={selectedNode.data.label}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
