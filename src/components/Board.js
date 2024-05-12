import React from "react";
import '../styles/Board.css';
function Board({ number=8 }) {
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

  };
  const calculateFontSize = (number) => {
    if(number!==8){
      return `1.5rem`;
    }
    return `2rem`;
  };
  const calculateGap = (number) => {
    if(number===12){
      return `0.9vh`;
    }
    if(number===10){
      return `2vh`;
    }
    return `2.4vh`;
  };
  const calculateGapLetters = (number)=>{
    if(number===12){
      return `1.8vw`;
    }
    if(number===10){
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

  const styleNumbers ={
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

  return (
    <div>
      <div className="board">
      <div className="letters" style={styleLetters}>
        {Array.from({ length: number }, (_, i) => (
          <p>{index.letter[i]}</p>
        ))}
      </div>
      <div className="numbers"style={styleNumbers}>
        {Array.from({ length: number }, (_, i) => (
          <p>{index.number[i]}</p>
        ))}
      </div>
        <div className="elements" style={styleInnerBoard}>
          {Array.from({ length: number * number }, (_, i) => (
            <div
              key={"el" + i}
              id={"el" + i}
              style={{ backgroundColor: "#D9D9D9", borderRadius: "3px" }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
