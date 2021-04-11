import React, {useState} from 'react';
import './App.css'; 
import { newBoard } from './newboard.js';

function App() {
  const [roll, setRoll] = useState(0);
  const [message, setMessage] = useState("Roll again");
  const [optMessage, setOptMessage] = useState("Kim");
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(-1);
  const [board, setBoard] = useState(newBoard.slice());
  
  // reset game (Play button)
  onReset = () => {
    setRoll(null);
    setMessage("Roll again");
    setOptMessage("Kim");
    setScore(0);
    setPosition(-1);
    setBoard(newBoard.slice());
  };
  // roll dice (roll button)
  onRoll = () => {
      let workBoard = board.slice();
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      let scoreAdj = 1;
      let newPosition = Math.min(position + randomNumber, workBoard.length - 1);
      let message = 'Roll again';
      let optMessage = 'Kim';
      // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
      if (workBoard[newPosition].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPosition].extraScore;
        if (workBoard[newPosition].extraScore < 0) {
          optMessage = 'Wonderful....you get an extra roll';
        } else {
          optMessage = 'Sorry....you lose a roll';
        }
      }
      // Add the detour squares and remove a single square after detour
      if (workBoard[newPosition].itemsToAdd !== undefined) {
        let workBoard2 = workBoard
          .slice(0, newPosition + 1)
          .concat(
            workBoard[newPosition].itemsToAdd,
            workBoard.slice(newPosition + 1 + workBoard[newPosition].itemsToDelete)
          );
        workBoard = workBoard2.slice();
        optMessage = 'You have a longer journey';
      }
      // Check for end of Game
      if (newPosition >= workBoard.length - 1) {
        message = 'Game Complete';
        optMessage = 'Kim';
      } else {
        message = 'Role Again';
      }
 //     return {
        setRoll(randomNumber)
        setMessage(message)                        // need new name
        setOptMessage(optMessage)                  // need new name
        setScore(prevScore => prevScore + scoreAdj)
        setPosition(newPosition)
        setBoard(workBoard)
 //     };
  };
  // return
    let isGameComplete = position <= board.length - 2;
    return (
      <div className="App">
        <div className="Nav">
          <div className="Box Button" style={{ gridColumn: 1, gridRow: 1 }} onClick={this.onReset}>
            Play
          </div>
          <div className="Box" style={{ gridColumn: 6, gridRow: 1 }}>
            Score
          </div>
          <div className="Box" style={{ gridColumn: 7, gridRow: 1 }}>
            {score}
          </div>
        </div>
        <div className="Messages">
          <h4>{message}</h4>
          <h5>{optMessage}</h5>
        </div>
        <div className="Board">
          {isGameComplete ? (
            <div className={'Button Box'} style={{ gridColumn: 4, gridRow: 1 }} onClick={this.onRoll}>
              Roll
            </div>
          ) : null}

          {isGameComplete ? (
            <div className={'Button Box'} style={{ gridColumn: 4, gridRow: 2 }}>
              {roll}
            </div>
          ) : null}
          {board.map((item, index) => (
            <div
              key={index}
              className={`Box${position === index ? ' markSpot' : ''}`}
              style={{ gridColumn: `${item.boxCol}`, gridRow: `${item.boxRow}` }}
            >
              {item.boxContent}
            </div>
          ))}
        </div>
      </div>
    );
  }

export default App;
