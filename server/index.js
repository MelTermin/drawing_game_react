const express=require('express');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


const app=express();
app.use(cors());
//creating the server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let players = [];
let gameStarted=false;
let mode= null;
let randomWord=null;

//run when a client connects
io.on('connection',(socket)=> {


    socket.on("user",(username,callback) => {
    
    //Taking the user who entered their name and put it in a state in the frontend as well
    //This also helps the define the drawer 
    const user= {name:username, id:socket.id, isAdmin:!gameStarted}
    
    // each player is pushed into the players list
    players.push(user);
    
    if(!gameStarted) {
      gameStarted=true
    }
    // console.log(socket)
    console.log(players,"players")
    //sending user and players to the frontend
    callback(players,user)


  
    // // welcome the user
    // socket.emit("welcome", `Welcome ${user}!`);
    // // inform the other users of a new player
    // socket.broadcast.emit("welcome", `${user} has joined the game.`);
  });

  //setting the mode
  socket.on("mode",(callback) => {
    callback(mode)
  })

  //setting the randomWord

  socket.on("randomWord",(callback) => {
    callback(randomWord)
  })
   
  
});
  






server.listen(5002,()=> {
  console.log("the server is running on port 5002")
})