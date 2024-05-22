import React from "react";
import Button from "../components/Button";
import WavesImage from "../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3BkbWlzYzNiYXRjaDItbG9jMjAwODY2MDQ3OGEtaW1hZ2VfMS5wbmc 1-Photoroom.png-Photoroom.png";
 import { useNavigate } from 'react-router-dom';

function ChoosePlacement() {

    const navigate = useNavigate();

  const stylePicture = {
    width: "100%",
    objectFit: "fill",
    position: "absolute",
    bottom: "0",
    zIndex: "0",
  };
  const stylePage = {
    height:"100vh",
    width:"100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#B5E2E0",
    justifyContent: "center",
  }
  const stylesButtons={
    display:"flex",
    marginTop:"65px",
    justifyContent: "space-between",
    gap: "150px",
  }

  // id=='random-placing-ships'? показати розставлені кораблі : сторінка для користувача з розставленням кораблів
  //викоистати placement1|placement2 для сабміту даних 
  const handleRandomPlacing = () => {
    navigate('/play');
  };

  const handleCustomPlacing = () => {
    navigate('/play');
  };
  return (
    <div style={stylePage}>
      <h1>Choose the way to place ships</h1>
      <div style={stylesButtons}>
      <Button
        id={"random-placing-ships"}
        value={"Place ships randomly"}
        onClick={handleRandomPlacing}
      />
      <Button
        id={"custom-placing-ships"}
        value={"Place ships by yourself"}
        onClick={handleCustomPlacing}
      />
        </div>
      <img
        className="waves-picture"
        style={stylePicture}
        src={WavesImage}
        alt="Waves"
      />
    </div>
  );
}

export default ChoosePlacement;
