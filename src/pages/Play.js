import React, { useEffect } from "react";
import Button from "../components/Button";
import Board from "../components/Board";
import '../styles/Play.css'
import { useNavigate } from 'react-router-dom';


function Play() {
  const [data, setData] = React.useState({});

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/initGame', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    setData(jsonData);
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
      <div id="player1-name"><h2>Player_1</h2></div>
        <div className="ships-placing-buttons">
        <Button
          id={"1deck-ships"}
          value={"One deck ships(NUMBER)"}
          onClick={handleOneDeckShips}
        />
        <Button
          id={"2deck-ships"}
          value={"Two deck ships(NUMBER)"}
          onClick={handleTwoDeckShips}

        />
        <Button
          id={"3deck-ships"}
          value={"Three deck ships(NUMBER)"}
          onClick={handleThreeDeckShips}
        />
        <Button
          id={"4deck-ships"}
          value={"Four deck ships(NUMBER)"}
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
      <Board number={data.size}/>    
    </div>
    
  );
}

export default Play;
