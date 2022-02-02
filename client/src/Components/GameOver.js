import React from 'react';
import {useHistory} from "react-router-dom"

function GameOver({word}) {
  const history=useHistory();

  const  handleRestart = () =>  {
    history.push("/")
  }
  return <div className='game-over'>
                <p>   You have finished the game
                you guesed the {word}</p>
            
                <button className='btn' onClick= {
                  handleRestart
                }>Restart</button>
          
          </div>;
}

export default GameOver;
