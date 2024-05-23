import React from "react";
import '../styles/Board.css';
function Board({ number = 8, board/* [][] */, point = null/* [x, y] | null */, onCellClick = (x, y) => { } }) {
  // private static final int EMPTY = 0;
  // private static final int SHIP = 1;
  // private static final int HIT = 2;
  // private static final int MISS = 3;
  // private static final int DISTANCE = 4;

  const styleInnerBoard = {
    padding: "40px",
    display: "grid",
    gridTemplateColumns: `repeat(${number}, 1fr)`,
    gridTemplateRows: `repeat(${number}, 1fr)`,
    gap: "4px",
    width: "40vw",
    height: "80vh",
    background: "#000000",
    borderRadius: "30px",
    userSelect: "none",
  };
  const calculateFontSize = (number) => {
    if (number !== 8) {
      return `1.5rem`;
    }
    return `2rem`;
  };
  const calculateGap = (number) => {
    if (number === 12) {
      return `0.9vh`;
    }
    if (number === 10) {
      return `2vh`;
    }
    return `2.4vh`;
  };
  const calculateGapLetters = (number) => {
    if (number === 12) {
      return `1.8vw`;
    }
    if (number === 10) {
      return `2.5vw`;
    }
    return `3vw`;
  }
  const styleLetters = {
    position: 'absolute',
    top: '10px',
    left: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'row',
    gap: calculateGapLetters(number),
    fontSize: calculateFontSize(number),
    justifyContent: 'center'
  }

  const styleNumbers = {
    position: 'absolute',
    top: '17px',
    bottom: '0',
    left: '10px',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: calculateGap(number),
    textAlign: 'left',
    fontSize: calculateFontSize(number),
    justifyContent: 'center',
    height: '100%',
  }
  const index = {
    letter: Array.from({ length: 12 }, (_, i) =>
      String.fromCharCode(i + 65).toUpperCase()
    ),
    number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };
  const styleCell = {
    cursor: "pointer", backgroundColor: "#D9D9D9", borderRadius: "3px",
    display: "flex", justifyContent: "center", alignItems: "center",
    fontSize: "1.5rem",
  }

  const getCellContent = (x, y) => {
    switch (board?.[y]?.[x]) {
      case 0:
        return point && point[0] === x && point[1] === y ? "🎯" : "";
      case 1:
        return "🚢";
      case 2:
        return "💥";
      case 3:
        return "💨";
      case 4:
        return "🌊";
      default:
        return '';
    }
  }

  return (
    <div>
      <div className="board">
        <div className="letters" style={styleLetters}>
          {Array.from({ length: number }, (_, i) => (
            <p key={i}>{index.letter[i]}</p>
          ))}
        </div>
        <div className="numbers" style={styleNumbers}>
          {Array.from({ length: number }, (_, i) => (
            <p key={i}>{index.number[i]}</p>
          ))}
        </div>
        <div className="elements" style={styleInnerBoard}>
          {Array.from({ length: number }, (_, y) => (
            Array.from({ length: number }, (_, x) => (
              <div
                id={`el${x};${y}`}
                key={`${x};${y}`}
                style={styleCell}
                onClick={() => onCellClick(x, y)}
              >
                {getCellContent(x, y)}
              </div>
            ))
          ))}
        </div>
      </div>
    </div >
  );
}

export default Board;
