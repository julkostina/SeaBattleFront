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
  const [currentShipSize, setCurrentShipSize] = React.useState(null); // 1, 2, 3, 4, null
  const [firstCoordinate, setFirstCoordinate] = React.useState(null); // [x, y] or null

  const player = parseInt(sessionStorage.getItem('player') ?? "1");

  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetch('http://localhost:8080/saveGame'));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      if (jsonData[`player${player}_board`]?.board?.some(row => row.some(cell => cell !== 0))) {
        navigate('/actual-play');
      }
      setData(jsonData.game);
      setOneDeck(jsonData.game.ships1.oneDeck);
      setTwoDeck(jsonData.game.ships1.twoDeck);
      setThreeDeck(jsonData.game.ships1.threeDeck);
      setFourDeck(jsonData.game.ships1.fourDeck);
    };

    fetchData();
  }, []);


  const handleRandomPlacing = async () => {
    const ships = [];
    const directions = [[0, 1], [1, 0]];
    const sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    for (const size of sizes) {
      let ship = null;
      while (ship === null) {
        const x = Math.floor(Math.random() * data.sizeOfBoard);
        const y = Math.floor(Math.random() * data.sizeOfBoard);
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const x2 = x + direction[0] * (size - 1);
        const y2 = y + direction[1] * (size - 1);
        if (x2 >= 0 && x2 < data.sizeOfBoard && y2 >= 0 && y2 < data.sizeOfBoard) {
          ship = [[x, y], [x2, y2]];
        }
      }
      ships.push(ship);
    }
    setShips(ships);
    setOneDeck(0);
    setTwoDeck(0);
    setThreeDeck(0);
    setFourDeck(0);
    // await fetch('http://localhost:8080/placeShips', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ shipCoordinates: null, placement: 'RANDOM', player }),
    // })
    // await handleClickBottomButtons("actual-play");
    // navigate('/actual-play');
  };
  const navigate = useNavigate();
  async function handleClickBottomButtons(id) {
    if (id === "actual-play") {
      await fetch('http://localhost:8080/placeShips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shipCoordinates: ships, placement: 'CUSTOM', player }),
      })
      navigate('/actual-play');
    }
    if (id === "back") {
      navigate('/');
    }
  };


  // ship: [[x1, y1], [x2, y2]]
  const [ships, setShips] = React.useState([]);

  // private static final int EMPTY = 0;
  // private static final int SHIP = 1;
  // private static final int HIT = 2;
  // private static final int MISS = 3;
  // private static final int DISTANCE = 4;
  const shipIndexOnCell = (x, y) => {
    return ships.findIndex(ship => {
      const [[x1, y1], [x2, y2]] = ship;
      const isHorizontal = y1 === y2;
      const isVertical = x1 === x2;
      if (isHorizontal && y === y1 && ((x >= x1 && x <= x2) || (x <= 1 && x >= 2))) return true;
      if (isVertical && x === x1 && ((y >= y1 && y <= y2) || (y <= 1 && y >= 2))) return true;
      console.log("shipIndexOnCell", false)
      return false
    })
  }

  const board = React.useMemo(() => {
    const shipIndexOnCell1 = (x, y) => {
      return ships.findIndex(ship => {
        const [[x1, y1], [x2, y2]] = ship;
        const isHorizontal = y1 === y2;
        const isVertical = x1 === x2;
        if (isHorizontal && y === y1 && ((x >= x1 && x <= x2) || (x <= x1 && x >= x2))) return true;
        if (isVertical && x === x1 && ((y >= y1 && y <= y2) || (y <= y1 && y >= y2))) return true;
        console.log("shipIndexOnCell", false)
        return false
      })
    }

    const board = [];// array of rows
    for (let i = 0; i < data.sizeOfBoard; i++) {
      const row = [];
      for (let j = 0; j < data.sizeOfBoard; j++) {
        row.push(shipIndexOnCell1(j, i) === -1 ? 0 : 1);
      }
      board.push(row);
    }

    return board;
  }, [ships, data.sizeOfBoard])


  const onCellClick = (x, y) => {
    const index = shipIndexOnCell(x, y);
    if (index !== -1) {
      console.log('deleting ship', index)
      const ship = ships[index];
      const size = Math.sqrt(Math.pow(ship[0][0] - ship[1][0], 2) + Math.pow(ship[0][1] - ship[1][1], 2)) + 1;
      switch (size) {
        case 1:
          setOneDeck(oneDeck + 1);
          break;
        case 2:
          setTwoDeck(twoDeck + 1);
          break;
        case 3:
          setThreeDeck(threeDeck + 1);
          break;
        case 4:
          setFourDeck(fourDeck + 1);
          break;
        default:
          break;
      }
      const newShips = [...ships.slice(0, index), ...ships.slice(index + 1)];
      setShips(newShips);
    } else {
      switch (currentShipSize) {
        case 1:
          if (oneDeck === 0) return;
          break;
        case 2:
          if (twoDeck === 0) return;
          break;
        case 3:
          if (threeDeck === 0) return;
          break;
        case 4:
          if (fourDeck === 0) return;
          break;
        default:
          break;
      }
      // TODO: check if ship can be placed
      if (currentShipSize === null) return;
      if (firstCoordinate === null) {
        if (currentShipSize === 1) {
          setShips([...ships, [[x, y], [x, y]]]);
          setOneDeck(oneDeck - 1);
        } else {
          setFirstCoordinate([x, y]);
        }
      } else {
        const [x1, y1] = firstCoordinate;
        const isHorizontal = y1 === y;
        const isVertical = x1 === x;
        if (!isHorizontal && !isVertical) return setFirstCoordinate(null)
        if (isHorizontal && isVertical) return setFirstCoordinate(null)
        if (isHorizontal) {
          if (Math.abs(x - x1) + 1 === currentShipSize) {
            setShips([...ships, [firstCoordinate, [x, y]]]);
            setFirstCoordinate(null);
            switch (currentShipSize) {
              case 2:
                setTwoDeck(twoDeck - 1);
                break;
              case 3:
                setThreeDeck(threeDeck - 1);
                break;
              case 4:
                setFourDeck(fourDeck - 1);
                break;
              default:
                break;
            }
          } else {
            console.log("Horizontal size mismatch")
          }
        } else {
          if (Math.abs(y - y1) + 1 === currentShipSize) {
            setShips([...ships, [firstCoordinate, [x, y]]]);
            setFirstCoordinate(null);
            switch (currentShipSize) {
              case 2:
                setTwoDeck(twoDeck - 1);
                break;
              case 3:
                setThreeDeck(threeDeck - 1);
                break;
              case 4:
                setFourDeck(fourDeck - 1);
                break;
              default:
                break;
            }
          } else {
            console.log("Vertical size mismatch")
          }
        }
      }
    }

  };

  return (
    <div className="ships-placing">
      <div className="ships-placing-captions">
        <div id="player1-name"><h2>{player === 1 ? data.player1 : data.player2}</h2></div>
        <div className="ships-placing-buttons">
          <Button
            id={"1deck-ships"}
            value={`One deck ships(${oneDeck})`}
            onClick={() => setCurrentShipSize(1)}
          />
          <Button
            id={"2deck-ships"}
            value={`Two deck ships(${twoDeck})`}
            onClick={() => setCurrentShipSize(2)}

          />
          <Button
            id={"3deck-ships"}
            value={`Three deck ships(${threeDeck})`}
            onClick={() => setCurrentShipSize(3)}
          />
          <Button
            id={"4deck-ships"}
            value={`Four deck ships(${fourDeck})`}
            onClick={() => setCurrentShipSize(4)}
          />
          <Button
            id={"random-placing-ships"}
            value={"Place ships randomly"}
            onClick={handleRandomPlacing}
          />
          {/* {JSON.stringify(ships)}
          {JSON.stringify(firstCoordinate)}
          {JSON.stringify(ships)} */}
          {currentShipSize}
        </div>
        <div className="bottom-buttons">
          <Button id={"actual-play"} value={"Actual play"} onClick={() => handleClickBottomButtons("actual-play")} />
          <Button id={"back"} value={"Back"} onClick={() => handleClickBottomButtons("back")} />
        </div>
      </div>
      <Board number={data.sizeOfBoard} board={board} point={firstCoordinate} onCellClick={onCellClick} />
    </div>

  );
}

export default Play;
