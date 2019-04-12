// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// const messages = [];
let counter = 0

wss.on('connection', (ws) => {

  counter +=1;

  console.log('Client connected');
  wss.clients.forEach(c => c.send((JSON.stringify(counter))))

  let message = {content: "A user has joined the room"};
  message.id = uuidv4(); 
  message.type = "postNotification";
  wss.clients.forEach(c => c.send(JSON.stringify(message)))


  ws.on('message', function (message) {
    message = JSON.parse(message)
    message.id = uuidv4(); 
    if (message.type === "postMessage") {
    message.type = "incomingMessage"
    }
    if (message.type === "postNotification") {
      message.type = "incomingNotification"
    }
    wss.clients.forEach(c => c.send(JSON.stringify(message)))
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

  counter -= 1;
  wss.clients.forEach(c => c.send((JSON.stringify(counter))))

  let message = {content: "A user has left the room"};
  message.id = uuidv4(); 
  message.type = "postNotification";
  wss.clients.forEach(c => c.send(JSON.stringify(message)))
  });
});
