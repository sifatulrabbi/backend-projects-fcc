const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});

/**
 * @param {string | number| undefined} date
 */
function service(date) {
  let unix, utc, d;
  if (date) {
    d = new Date(date);
    if (!d.getTime()) d = new Date(parseInt(date, 10));
    if (!d.getTime()) return { error: "Invalid Date" };
    utc = d.toUTCString();
    unix = d.getTime();
  } else {
    d = new Date();
    unix = d.getTime();
    utc = d.toUTCString();
  }
  return { unix, utc };
}

app.get("/api/", function (_req, res) {
  const timestamp = service();
  res.status(200).json(timestamp);
});

app.get("/api/:date", (req, res) => {
  const timestamp = service(req.params.date);
  res.status(200).json(timestamp);
});

server.listen(process.env.PORT, () => {
  console.log("Server is listening to port: " + process.env.PORT);
});
