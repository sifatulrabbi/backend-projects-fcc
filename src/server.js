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
  let unix, utc;
  if (date) {
    let d = new Date(date);
    if (!d.getTime()) d = new Date(parseInt(date, 10));
    utc = d.toUTCString();
    unix = d.getTime();
  }
  return { unix, utc };
}

app.get("/api/hello", function (_req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const timestamp = service(req.params.date);
  res.status(200).json(timestamp);
});

server.listen(process.env.PORT, () => {
  console.log("Server is listening to port: " + process.env.PORT);
});
