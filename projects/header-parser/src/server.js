const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(__dirname + "/public"));

app.get("/", (_req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", (req, res) => {
  const info = {};
  info.ipaddress = req.ip;
  info.language = req.headers["accept-language"];
  info.software = req.headers["user-agent"];
  res.status(200).json(info);
});

server.listen(process.env.PORT, () => {
  console.log("Server is listening to port: " + process.env.PORT);
});
