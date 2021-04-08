import React from 'react';
import './App.css';
import { newBoard } from './newboard.js';

class App extends React.Component {
  state = {
    roll: 0,
    message: 'Roll again',
    optMessage: 'Kim',
    score: 0,
    position: -1,
    board: newBoard.slice(),
  };
  // reset game (Play button)
  onReset = () => {
    this.setState({
      roll: null,
      message: 'Roll again',
      optMessage: 'Kim',
      score: 0,
      position: -1,
      board: newBoard.slice(),
    });
  };
  // roll dice (roll button)
  onRoll = () => {
    this.setState(oldState => {
      let workBoard = oldState.board.slice();
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      let scoreAdj = 1;
      let newPosition = Math.min(oldState.position + randomNumber, workBoard.length - 1);
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
      return {
        board: workBoard,
        roll: randomNumber,
        message: message,
        optMessage: optMessage,
        score: oldState.score + scoreAdj,
        position: newPosition,
      };
    });
  };
  // render
  render() {
    let isGameComplete = this.state.position <= this.state.board.length - 2;
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
            {this.state.score}
          </div>
        </div>
        <div className="Messages">
          <h4>{this.state.message}</h4>
          <h5>{this.state.optMessage}</h5>
        </div>
        <div className="Board">
          {isGameComplete ? (
            <div className={'Button Box'} style={{ gridColumn: 4, gridRow: 1 }} onClick={this.onRoll}>
              Roll
            </div>
          ) : null}

          {isGameComplete ? (
            <div className={'Button Box'} style={{ gridColumn: 4, gridRow: 2 }}>
              {this.state.roll}
            </div>
          ) : null}
          {this.state.board.map((item, index) => (
            <div
              key={index}
              className={`Box${this.state.position === index ? ' markSpot' : ''}`}
              style={{ gridColumn: `${item.boxCol}`, gridRow: `${item.boxRow}` }}
            >
              {item.boxContent}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
