import React, { useEffect } from "react";
import Button from "../components/Button";
import Board from "../components/Board";
import '../styles/Play.css'
import { useNavigate } from 'react-router-dom';


function Play() {
  const [data, setData] = React.useState({});
  const [oneDeck, setOneDeck] = React.useState(0);
  const [twoDeck, setTwoDeck] = React.useState(0);
  const [threeDeck, setThreeDeck] = React.useState(0);
  const [fourDeck, setFourDeck] = React.useState(0);
useEffect(() => {
  const fetchData = async () => {
    const response = (await fetch('http://localhost:8080/saveGame'));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    setData(jsonData);
    setOneDeck(jsonData.ships1.oneDeck);
    setTwoDeck(jsonData.ships1.twoDeck);
    setThreeDeck(jsonData.ships1.threeDeck);
    setFourDeck(jsonData.ships1.fourDeck);
  };

  fetchData();
},[]);


  const handleOneDeckShips = () => {
    
  };
  const handleTwoDeckShips = () => {
    
  };
  const handleThreeDeckShips = () => {

  };
  const handleFourDeckShips = () => {
    console.log("Random placing ships");

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
      <div id="player1-name"><h2>{data.player1}</h2></div>
        <div className="ships-placing-buttons">
        <Button
          id={"1deck-ships"}
          value={`One deck ships(${oneDeck })`}
          onClick={handleOneDeckShips}
        />
        <Button
          id={"2deck-ships"}
          value={`Two deck ships(${twoDeck })`}
          onClick={handleTwoDeckShips}

        />
        <Button
          id={"3deck-ships"}
          value={`Three deck ships(${threeDeck })`}
          onClick={handleThreeDeckShips}
        />
        <Button
          id={"4deck-ships"}
          value={`Four deck ships(${fourDeck })`}
          onClick={handleFourDeckShips}
        />
        <Button
          id={"random-placing-ships"}
          value={"Place ships randomly"}
          onClick={handleRandomPlacing}
        />
        </div>
       <div className="bottom-buttons">
       <Button id={"actual-play"} value={"Actual play"} onClick={()=>handleClickBottomButtons("actual-play")}/>  
       <Button id={"back"} value={"Back"} onClick={()=>handleClickBottomButtons("back")}/>  
       </div>
      </div>
      <Board number={data.sizeOfBoard}/>    
    </div>
    
  );
}

export default Play;
