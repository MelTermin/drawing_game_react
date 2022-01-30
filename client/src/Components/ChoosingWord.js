import React,{useState} from 'react';
import {useHistory} from "react-router-dom"
import words from "../WordList.json"

import io from "socket.io-client";

const socket = io.connect("http://localhost:5002");

function ChoosingWord({difficultyLevel,name,setIsClicked}) {
  const history=useHistory();
  const [word, setWord]=useState("");
  const shuffledWords= words.sort(() => Math.random() - 0.5)

  const handleWord= (e) => {
    let value=e.target.innerText
    console.log(value,"from word choosing component")
    socket.emit("mode", (randomWord)=> {
      setWord(value)
      history.push(`/drawing?word=${value}`)
    })

  }
  return <div className='word-choosing container'>
          <div>
            <p>{name} you have choosen {difficultyLevel} word as a level</p>
          </div>
          <div className='word'>
            <p>Please choose a word</p>
            {shuffledWords.splice(0,5).map((item, i) => (
                  <div key={i}>
                       <div className='word-btn-container'>
                        <button className='btn' onClick={(e)=>handleWord(e)}>{item}</button>  
                      </div> 
                  </div>
            ))}
          </div>
    
        </div>;
}

export default ChoosingWord;
