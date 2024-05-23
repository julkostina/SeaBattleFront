import React from "react";
import "../styles/ActualPlay.css";
import Button from "../components/Button";
import Board from "../components/Board";

function ActualPlay({ number, HIT_AUDIO = null }) {
  const handleOnShoot = () => {
    HIT_AUDIO.current.currentTime = 0;
    HIT_AUDIO.current.play();
    console.log("Shoot");
  };
  const handleOnSaveGame = () => {
    console.log("Save game");
  };
  return (
    <div className="actual-play">
      <div className="player-name">
        <h2>PLAYER</h2>
      </div>
      <div className="boards">
        <div className="boards-captions">
          <h3>Your board</h3>

          <h3>Opponent`s board</h3>
        </div>
        <div className="actual-boards">
          <Board number={number} />
          <Board number={number} />
        </div>
        <div className="bottom-buttons">
          <Button id="shoot" value="Shoot" onClick={handleOnShoot} />
          <Button
            id="save-game"
            value="Save game"
            onClick={() => handleOnSaveGame}
          />
        </div>
      </div>
    </div>
  );
}

export default ActualPlay;
