const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const memeRoutes = require('./routes/memeRoutes.js');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', memeRoutes);

// WebSocket Setup (optional for your project)
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('🟢 A user connected');
  socket.on('disconnect', () => console.log('🔴 A user disconnected'));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
