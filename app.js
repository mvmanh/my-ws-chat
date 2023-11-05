const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let numOfClients = 0
let numOfMessages = 0

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  console.log(`${++numOfClients}`);

  socket.on('disconnect', () => {
    console.log(`\t${--numOfClients}`);
  });

  socket.on('message', (msg) => {
    numOfMessages += 1
    io.emit('message', msg);
  });
});

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
