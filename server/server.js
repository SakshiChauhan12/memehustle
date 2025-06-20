const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// ✅ Single connection handler
io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('new_bid', (data) => {
    io.emit('broadcast_bid', data);
  });

  socket.on('meme_upvoted', (updatedMeme) => {
    io.emit('broadcast_upvote', updatedMeme);
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});


server.listen(3001, () => {
  console.log('🚀 WebSocket server running on port 3001');
});
