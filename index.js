const express = require('express');
const db = require('./db');
const PORT = 8000;

// Middleware

const setupMiddleWare = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
}
//Routes
const setupRoutes = (app) => {
    app.use("/api", require("./api"));
    app.use("/auth", require("./auth"))
};

const startServer = async (app,port) => {
    await db.sync();
    app.listen(port, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    return app;
}
const configureApp = (port) => {
    const app = express();
    setupMiddleWare(app)
    setupRoutes(app);
    return startServer(app, port);
};
// Start the server



module.exports = configureApp(PORT);