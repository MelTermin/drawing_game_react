import React,{useEffect,useState} from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5002");

function Game() {


  return <div className='game-container'>
            
            <div className='game-views'>
                Viewing of the drawn picture
            </div>
            <div className='game-views'>Chatting area</div>

        </div>;
}

export default Game;
