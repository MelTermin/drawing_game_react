import React,{useEffect,useState} from 'react';
import io from "socket.io-client";
import CanvasDraw from "react-canvas-draw";



const socket = io.connect("http://localhost:5002");


function Game() {

 
  const[image,setImage]=useState("")
  const [guessedWord, setGuessedWord]=useState("")




     useEffect(() => {
      
    //adding event listerners with socket.on, useEffect create event listeners
    socket.on("picture",setImage)
    return ()=> {
      //remove event listeners when components remounts I will not have more than one
      //specifiying the function name is setImage1 and event is picture//
      socket.off("picture", setImage)
    }
   
    }, []);

    const submitHandler= (e) => {
      e.preventDefault();
      console.log(guessedWord,"guessedword from client")
      // if(guessedWord===)
    
    }




  return <div className='game-container'>
            
            {!image ? (
              <div className='waiting-container'>
                <p className='waiting-text'>Waiting for drawer to send the picture</p>
                <p className='waiting-text'>Thank you for your patience</p>
                <div className='loader'></div>
              </div>):(            
              <div className='game-views' >
                  <div className='image-container'>
                    <div className='title'>   
                       <h2>Here is Drawer's Picture</h2>
                    </div>
                    <img src={image}></img>
                  </div>
                  
                  <div className='guessing-wrapper'>
                    <form className='form-wrapper' onSubmit={submitHandler}>
                      <h2>Please guess the word</h2>
                      <input className='guessing-input' placeholder='Please type your guess' type="text" value={guessedWord} onChange={(e)=>setGuessedWord(e.target.value)}/>
                      <button className='btn-guess'>Send</button>
                    </form>
                  </div>
              </div>)
              }

           

        </div>;
}

export default Game;
