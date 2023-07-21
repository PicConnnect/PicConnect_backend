require("dotenv").config();
const { Comment, Photo, User } = require("./db/models");
const http = require("http");
const express = require("express");
const cors = require("cors");
const db = require("./db");
const PORT = 8000;

// Middleware
const setupMiddleWare = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:3000"], //app url
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

//Routes: mount on api and auth
const setupRoutes = (app) => {
  app.use("/api", require("./api"));
  app.get("/", (req, res, next) => {
    console.log("HIT HOME");
    res.send("HI");
  });
};

//start server, sync db, and setup socket.io
const startServer = async (app, server, port) => {
  await db.sync();
  //socekt.io setup with cors
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000", //app url
      //methods: ['GET', 'POST']
      credentials: true,
    },
  });

  //event handlers
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", async (roomId) => {
      console.log(`Joined room: ${roomId}`);
      socket.join(roomId);
      //existing comments when user joins the room
      const oldComments = await getCommentsFromDatabase(roomId);
      console.log(`Fetched comments: ${JSON.stringify(oldComments)}`);
      socket.emit("existingComments", oldComments);
    });
    //new comment events
    socket.on("newComment", async (data) => {
      console.log(`Received new comment from client: ${data}`);
      //save comment to db
      const newComment = await saveCommentToDatabase(data.comment, data.userId, data.roomId);
      console.log(`Saved comment to database: ${newComment}`);
      //console.log(`Saved comment: ${JSON.stringify(newComment)}`);
      //show comment to every other user in the room
      io.to(data.roomId).emit('newComment', newComment);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
  server.listen(port, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  return server;
};
const configureApp = (port) => {
  const app = express();
  setupMiddleWare(app);
  setupRoutes(app);
  // app.listen(PORT, () => {
  //     console.log(`Listening to port ${PORT}`)

  // })
  const server = http.createServer(app);
  return startServer(app, server, port);
};

module.exports = configureApp(PORT);

async function getCommentsFromDatabase(photoId) {
  try {
    const comments = await Comment.findAll({
      where: { photoId },
      include: User,
      order: [["createdAt", "DESC"]],
    });
    console.log(`Comments fetched from database for photoId ${photoId}: ${comments}`);
    return comments;
  } catch (error) {
    console.error(`Failed to get comments: ${error}`);
  }
}

async function saveCommentToDatabase(comment, userId, photoId) {
  try {
    const newComment = await Comment.create({
      commentText: comment,
      userId,
      photoId,
    });
    console.log(`Comment saved to database: ${newComment}`);
    return newComment;
  } catch (error) {
    console.error(`Failed to post comment: ${error}`);
  }
}
