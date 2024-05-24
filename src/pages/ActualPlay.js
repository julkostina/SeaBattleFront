import React from "react";
import "../styles/ActualPlay.css";
import Button from "../components/Button";
import Board from "../components/Board";
function ActualPlay({ number, HIT_AUDIO = null }) {
  const player = parseInt(sessionStorage.getItem('player') ?? "1");

  const [state, setState] = React.useState({
    player1_name: "1...",
    winner: -3,
    player2_name: "2...",
    turn: 1,
    player1_board: null,
    player2_board: null,
  });

  React.useEffect(() => {
    const interval = setInterval(async () =>
      fetch('http://localhost:8080/inGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player }),
      })
        .then((response) => response.json())
        .then(newState => {
          if (state.winner === 0) {
            if (newState.winner === player) {
              console.log("You win");
            } else {
              console.log("You lose");
            }
          }
          setState(newState);
        }), 1000);
    return () => clearInterval(interval);
  });

  const makeMove = async (x, y) => {
    if (state.turn !== player) {
      console.log("Not your turn");
      return;
    }
    HIT_AUDIO.current.currentTime = 0;
    HIT_AUDIO.current.play();
    await fetch('http://localhost:8080/shoot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player, x, y }),
    })
  }

  return (
    <div className="actual-play">
      <div className="player-name">
        <h2>You: {state[`player${player}_name`]} | Turn: {state[`player${state.turn}_name`]}</h2>
      </div>
      {
        state.winner < 0 ? <h1>Not all players are ready!</h1> :
          state.winner > 0 ? <h1>{state.winner === player ? "You win!" : "You lose!"}</h1> :
            <div className="boards">
              <div className="boards-captions">
                <h3>Your board</h3>

                <h3>Opponent`s board</h3>
              </div>
              <div className="actual-boards">
                <Board number={number} board={state[`player${player}_board`]?.board} />
                <Board number={number} board={state[`player${player === 1 ? 2 : 1}_board`]?.board} onCellClick={makeMove} />
              </div>
              <div className="bottom-buttons">
                <a href="http://localhost:8080/saveGame"
                  download
                  id="save-game"
                >Save game</a>
              </div>
            </div>
      }
    </div>
  );
}

export default ActualPlay;
