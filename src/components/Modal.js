import React from 'react';

function Modal({ isOpen, onClose, children}) {
  if (!isOpen) {
    return null;
  }
const stylesModal = {
  padding: "30px", 
  zIndex: 10,
  backgroundColor:"#89C8DC",
  border: "solid 2px #000000",
  borderRadius: "30px",
  position: "fixed",
  top: "50%", 
  left: "50%", 
  transform: "translate(-50%, -50%)", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center",
}
const stylesWindow = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}
const stylesButton = {
  backgroundColor: "#89C8DC",
  color: "#000000",
  borderRadius: "30px",
  padding: "10px 40px",
  fontSize: "16px",
  border: "solid 2px #000000",
  cursor: "pointer",
  margin: "10px",
}
  return (
    
    <div style={stylesModal}className="modal-overlay">
      <div style={stylesWindow} className="modal-window">
        {children}
        <button style={stylesButton}onClick={onClose}>Start</button>
      </div>
    </div>
  );
}

export default Modal;