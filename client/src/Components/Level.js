import React,{useEffect,useState} from 'react';
import ChoosingWord from './ChoosingWord';
import queryString from "query-string";
import io from "socket.io-client";


const socket = io.connect("http://localhost:5002");


function Level({location}) {
  const [name,setName]=useState("");

  const [difficultyLevel, setDifficultyLevel]=useState("");
  const [isClicked, setIsClicked] = useState(false);
 

  useEffect( () => {
    const {drawer} = queryString.parse(location.search);
    setName(drawer);
  },[location.search]);


  const handleLevelEasy= (e) => {
    //taking the buttons innerText value and assing it to a state
    let value=e.target.innerText
    //setting the difficulty level on serverside
    socket.emit("mode", (mode)=> {
      setDifficultyLevel(value)
    })
    setIsClicked(true);
   

   
  }
  const handleLevelMedium= () => {
  

    
  }
  const handleLevelHard= () => {
  


   
  }

  return <div className='level-container'>
           
            {!isClicked   ? (  
               <div>          
                  <div className='greeting'>
                    <p>Hello, {name}! You are the drawer</p>
                  </div>
                  <div className='level-choosing'>
                    <p>Please choose a difficulty level for your word</p>
                      <button onClick={(e) =>handleLevelEasy(e)}>Easy</button>
                      
                      <button onClick={handleLevelMedium}>Medium</button>
                      <button onClick = {handleLevelHard} >Hard</button>
                  </div>  
                </div>): (<ChoosingWord difficultyLevel = {difficultyLevel} name= {name} setIsClicked={setIsClicked}/>) }

        
        </div>;
}

export default Level;
