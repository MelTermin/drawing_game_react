import React,{useEffect,useState} from 'react';
import {useHistory} from "react-router-dom"
import CanvasDraw from "react-canvas-draw";
import queryString from "query-string";

function Drawing({location}) {
  const history=useHistory();
  const [word, setWord]=useState("");
  

  useEffect( () => {
    const {word} = queryString.parse(location.search);
    setWord(word);
  },[location.search]);

  const sendDrawingHandler = () => {
    history.push("/game")
  }

  // const getCanvasData = ( canvasDraw ) => {
  //   return canvasDraw.getSaveData() 
  // }
  // const saveCanvas = ( canvasDraw ) => {
  //   localStorage.setItem(
  //     'drawing', 
  //     getCanvasData( canvasDraw )  
  //   )
  //   return void 0
  // }
 
  return <div>
            <div className='drawing container'>
              <div className='word'>
                <p>Your are drawing {word}</p>
              </div>
              <CanvasDraw className='canvas'  canvasWidth={900} canvasHeight={600} />
              {/* <button onClick={() => {CanvasDraw.clear()}}>Clear</button>
              <button onClick= {saveCanvas}>Save</button> */}
              <button className='btn-send' onClick={sendDrawingHandler} >Send</button> 
           
            </div>

        </div>;
}

export default Drawing;
