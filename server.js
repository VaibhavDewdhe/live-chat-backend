const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Allow CORS for frontend
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // For dev purposes; restrict in production
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("chat message", (data) => {
    console.log("📨 Message received:", data);

    // Broadcast the message to all other clients
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
