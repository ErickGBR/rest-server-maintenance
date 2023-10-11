require("dotenv").config();
const Server = require('./models/server');

const dataServer = new Server();
dataServer.listen()