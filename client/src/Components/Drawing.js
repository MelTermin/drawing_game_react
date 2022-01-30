import React,{useState,useRef} from 'react';
import {useHistory} from "react-router-dom"
import CanvasDraw from "react-canvas-draw";

function Drawing() {
  const history=useHistory();
  const savedCanvas=useRef(CanvasDraw)

  const sendDrawingHandler = () => {
    history.push("/game")
  }


 
  return <div>
            <div className='drawing container'>
              <CanvasDraw  canvasWidth={1500} canvasHeight={600}  ref = {savedCanvas} />
              {/* <button
            onClick={() => {
              CanvasDraw.clear();
            }}
          >
            Clear
          </button> */}
              <button onClick={sendDrawingHandler} >Send</button>
            </div>

        </div>;
}

export default Drawing;
