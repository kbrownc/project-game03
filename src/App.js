import React, { useState, useCallback } from 'react';
import './App.css';
import { newBoard } from './newboard.js';

function App() {
  const [{ roll, position, message, optMessage, score, board }, setGameState] = useState({
    roll: 0,
    position: -1,
    message: 'Roll again',
    optMessage: 'Kim',
    score: 0,
    board: newBoard.slice(),
  });
  // reset game (Play button)
  const onReset = useCallback(() => {
    setGameState( () => {
      return {
        roll: null,
        position: -1,
        message: 'Roll again',
        optMessage: 'Kim',
        score: 0,
        board: newBoard.slice(),
      };
    });
  }, []);

  // roll dice (roll button)
  const onRoll = useCallback(() => {
    setGameState(prevGameState => {
      let workBoard = prevGameState.board.slice();
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const newPosition = Math.min(prevGameState.position + randomNumber, workBoard.length - 1);
      let scoreAdj = 1;
      let workMessage = 'Roll again';
      let workOptMessage = 'Kim';
      // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
      if (workBoard[newPosition].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPosition].extraScore;
        if (workBoard[newPosition].extraScore < 0) {
          workOptMessage = 'Wonderful....you get an extra roll';
        } else {
          workOptMessage = 'Sorry....you lose a roll';
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
        workOptMessage = 'You have a longer journey';
      }
      // Check for end of Game
      if (newPosition >= workBoard.length - 1) {
        workMessage = 'Game Complete';
        workOptMessage = 'Kim';
      } else {
        workMessage = 'Role Again';
      }
      return {
        roll: randomNumber,
        position: newPosition,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score + scoreAdj,
        board: workBoard,
      };
    });
  }, []);

  let isGameComplete = position <= board.length - 2;
  // render
  return (
    <div className="App">
      <div className="Nav">
        <div className="Box Button" style={{ gridColumn: 1, gridRow: 1 }} onClick={onReset}>
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
          <div className={'Button Box'} style={{ gridColumn: 4, gridRow: 1 }} onClick={onRoll}>
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
