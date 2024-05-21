import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  const stylesModal = {
    padding: "30px",
    zIndex: 10,
    backgroundColor: "#89C8DC",
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
  return (

    <div style={stylesModal} className="modal-overlay">
      <div style={stylesWindow} className="modal-window">
        {children}
      </div>
    </div>
  );
}

export default Modal;