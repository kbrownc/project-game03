import React from 'react';
import './App.css';
import {newBoard} from './newboard.js';

let message = "Roll again";
let optMessage = "Kim";
let score = 0;

class App extends React.Component {
  state = {
    roll: 0,
    score: 0,
    position: -1,
    board: newBoard.slice()
  };
// reset game (Play button)
  onReset = () => {
   message = "Roll again";
   optMessage = "Kim";
   score = 0;
    this.setState(({
      roll: null,
      score: 0,
      position: -1,
      board: newBoard.slice()
    }))
  }
// roll dice (roll button)
  onRoll = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    let scoreAdj = 1;
    optMessage = "Kim";
    // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
    if (this.state.board[Math.min(this.state.position + randomNumber, this.state.board.length - 1)].extraScore != undefined){
        scoreAdj = scoreAdj + this.state.board[this.state.position + randomNumber].extraScore;
        if (this.state.board[this.state.position + randomNumber].extraScore < 0){
            optMessage = "Wonderful....you get an extra roll";
          }
          else {
            optMessage = "Sorry....you lose a roll";
          }
      };
    // Add the detour squares and remove a single square after detour
    if (this.state.board[Math.min
    (this.state.position + randomNumber, this.state.board.length - 1)  ].itemsToAdd!= undefined){  
        this.state.board.splice(this.state.position + randomNumber + 1, 1 ,  
            this.state.board[this.state.position + randomNumber].itemsToAdd[0],
            this.state.board[this.state.position + randomNumber].itemsToAdd[1],
            this.state.board[this.state.position + randomNumber].itemsToAdd[2],
            this.state.board[this.state.position + randomNumber].itemsToAdd[3],
            this.state.board[this.state.position + randomNumber].itemsToAdd[4],
            this.state.board[this.state.position + randomNumber].itemsToAdd[5],
            this.state.board[this.state.position + randomNumber].itemsToAdd[6]);
        optMessage = "You have a longer journey";
    }
    // Check for end of Game
    if ((this.state.position + 1) >= (this.state.board.length - 1)) {
      message = "Game Complete";
      optMessage = "Kim";
    }
    else {
        message = "Role Again";
    }
    score = score + scoreAdj;
    this.setState((oldState) => ({
      roll: randomNumber,
      score: score,
      position: Math.min(oldState.position + randomNumber, this.state.board.length - 1),
      board: this.state.board.slice()
    }));
  }
// render
 render() { 
    return (
      <div className="App">
        <div className="Nav">      
          <div className="Box Butt" style={{gridColumn: 1, gridRow: 1}} onClick={this.onReset}>Play</div>
          <div className="Box" style={{gridColumn: 6, gridRow: 1}}>Score</div>
          <div className="Box" style={{gridColumn: 7, gridRow: 1}}>{this.state.score}</div>
        </div>
        <div className="Messages">       
              <h4>{message}</h4>
              <h5>{optMessage}</h5>
        </div>
        <div className="Board">
            <div 
              className={`Butt Box${this.state.position <= this.state.board.length - 2 ? "" : 'Gone'}`}
              style={{gridColumn: 4, gridRow: 1}} 
              onClick={this.onRoll}>Roll</div>
            <div 
              className={`Box${this.state.position <= this.state.board.length - 2 ? "" : 'Gone'}`}
              style={{gridColumn: 4, gridRow: 2}}>{this.state.roll}</div>
          {
              this.state.board.map((item, index) => (
                <div key={index}
               className={`Box${this.state.position === index ? " markSpot" : ''}`}
                style={{gridColumn: `${item.boxCol}`, gridRow: `${item.boxRow}`}}  
                >{item.boxContent}
                </div>
            ))
          }
        </div>
      </div>
    );      
  }
}

export default App;