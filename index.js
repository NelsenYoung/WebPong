const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const WebSocket = require('ws');

const server = require('http').createServer(app);

const wss = new WebSocket.Server({server})

var numClients = 0;
wss.on('connection', function connection(ws) {
  /*
  ws.on('error', console.error);
  numClients += 1;
  console.log("New Client Connected");
  ws.send("Hello, new client");
  ws.send(numClients);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  */

  ws.on('message', )

});

function ParseMessage(message){
  try{
    data = JSON.parse(message);
    switch(data.action){
      case 'nameButtonPressed':
        console.log("CHANGE THIS");
      default:
        console.log("CHANGE THIS"); 
    }
  } catch (err) {
    console.error('Failed to parse message:', message, err);
  }
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log("Listening on port: 3000")
});
