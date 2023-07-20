require('dotenv').config();
const http = require('http')
const ioLib = require('socket.io')
const express = require('express');
const cors = require('cors');
const db = require('./db');
const PORT = 8000;

// Middleware

const setupMiddleWare = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
}


//Routes: mount on api and auth 
const setupRoutes = (app) => {
    app.use("/api", require("./api"));
};

const startServer = async (app, server, port) => {
    await db.sync();

    const io = ioLib(server);

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('new comment', (comment) => {
            console.log('New comment: ', comment);
            io.emit('new comment', comment)
        })
    })
    server.listen(port, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    return app;
};
const configureApp = (port) => {
    const app = express();
    setupMiddleWare(app)
    setupRoutes(app);
    const server = http.createServer(app);
    return startServer(app, server, port);
};


module.exports = configureApp(PORT);