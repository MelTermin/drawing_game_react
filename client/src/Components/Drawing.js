import React,{useEffect,useState} from 'react';
import {useHistory} from "react-router-dom"
import CanvasDraw from "react-canvas-draw";
import queryString from "query-string";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5002");

function Drawing({location}) {
  const history=useHistory();
  const [word, setWord]=useState("");
  const [drawing,setDrawing]=useState({});
  const [canvas, setBrush] = useState("#FCA5A5");

  const stageRef = React.useRef(null);

  useEffect( () => {
    const {word} = queryString.parse(location.search);
    setWord(word);
  },[location.search]);

  const sendDrawingHandler = (e) => {
    e.preventDefault();
    const getImage=stageRef.current.getDataURL();
    socket.emit("picture", getImage)
    setDrawing(getImage)
    
    history.push(`/game`)
  }


 
  return <div>
          
            <div className='drawing container'>
              <div className='word'>
                <p>Your are drawing {word}</p>
              </div>
              <div className='palette-div'>
                   <input
                      style={{ background: { canvas } }}
                      type="color"
                      value={canvas}
                      onChange={(event) => {setBrush(event.target.value);}}/>
              </div>
              <CanvasDraw className='canvas'  canvasWidth={900} canvasHeight={600} ref={stageRef} brushColor={canvas} image={drawing} />

              <button className='btn-send' onClick={() => {stageRef.current.undo();}}>undo</button>
              <button className='btn-send' onClick={sendDrawingHandler} >Send</button> 
 
            </div>

        </div>;
}

export default Drawing;
