import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import '../styles/NextPlayer.css'

function NextPlayer({number}) {
    const handleOneDeckShips = () => {
        console.log("1 deck ships");
      };
      const handleTwoDeckShips = () => {
        console.log("2 deck ships");
      };
      const handleThreeDeckShips = () => {
        console.log("3 deck ships");
      };
      const handleFourDeckShips = () => {
        console.log("4 deck ships");
      };
      const handleRandomPlacing = () => {
        console.log("Random placing ships");
      };
      const navigate = useNavigate();
      function handleClickBottomButtons(id){
        if(id==="start"){
          navigate('/actual-play');
        }
        if(id==="back"){
          navigate('/play');
        }
      };
      return (
    <div className="ships-placing">
    <Board number={12}/>   
    <div className="ships-placing-captions">
    <div id="player1-name"><h2>Player_2</h2></div>
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
     <Button id={"back"} value={"Back"} onClick={()=>handleClickBottomButtons("back")}/>  
     <Button id={"start"} value={"Start"} onClick={()=>handleClickBottomButtons("start")}/>  
     </div>
    </div> 
  </div>
)
}

export default NextPlayer