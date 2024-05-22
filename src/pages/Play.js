import React, { useEffect } from "react";
import Button from "../components/Button";
import Board from "../components/Board";
import '../styles/Play.css'
import { useNavigate } from 'react-router-dom';


function Play() {
  const [isDiasabled, setIsDisabled] = React.useState(false);
    const data = async () => {
    const response = await fetch('http://localhost:8080/initGame', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();};
  const placementField = "placementStrategy"+data.turn;
  const isPlaced = "placed"+data.turn;


  useEffect(() => {
    if(data.placementField ==="RANDOM"){ // ???
      setIsDisabled(true);
    }
  },[]);
  const handleOneDeckShips = () => {
    
  };
  const handleTwoDeckShips = () => {
    
  };
  const handleThreeDeckShips = () => {

  };
  const handleFourDeckShips = () => {

  };
  const handleRandomPlacing = () => {
    console.log("Random placing ships");
  };
  const navigate = useNavigate();
  function handleClickBottomButtons(id){
    if(id==="actual-play"){
      navigate('/actual-play');
    }
    if(id==="back"){
      navigate('/');
    }
  };

  return (
    <div className="ships-placing">
      <div className="ships-placing-captions">
      <div id="player1-name"><h2>Player_1</h2></div>
        <div className="ships-placing-buttons">
        <Button
          id={"1deck-ships"}
          value={"One deck ships(NUMBER)"}
          onClick={handleOneDeckShips}
          disabled = {isDiasabled}
        />
        <Button
          id={"2deck-ships"}
          value={"Two deck ships(NUMBER)"}
          onClick={handleTwoDeckShips}
          disabled = {isDiasabled}

        />
        <Button
          id={"3deck-ships"}
          value={"Three deck ships(NUMBER)"}
          onClick={handleThreeDeckShips}
          disabled = {isDiasabled}
        />
        <Button
          id={"4deck-ships"}
          value={"Four deck ships(NUMBER)"}
          onClick={handleFourDeckShips}
          disabled = {isDiasabled}
        />
        <Button
          id={"random-placing-ships"}
          value={"Place ships randomly"}
          onClick={handleRandomPlacing}
          disabled = {!isDiasabled}
        />
        </div>
       <div className="bottom-buttons">
       <Button id={"actual-play"} value={"Actual play"} onClick={()=>handleClickBottomButtons("actual-play")}/>  
       <Button id={"back"} value={"Back"} onClick={()=>handleClickBottomButtons("back")} disabled={isPlaced}/>  
       </div>
      </div>
      <Board number={data.sizeOfBoard}/>    
    </div>
    
  );
}

export default Play;
