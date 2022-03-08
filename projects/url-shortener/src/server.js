const http = require("http");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const upload = multer();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static(__dirname + "/public"));

const urls = [];

/**
 * @param {string} url
 * @returns {boolean}
 */
function validateUrl(url) {
  const expression =
    /https?\:\/\/+[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  let valid = true;
  if (!url.match(regex)) valid = false;
  return valid;
}

app.get("/", (_req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const result = {};
  result.original_url = req.body.url;

  if (!validateUrl(result.original_url)) {
    return res.status(400).json({ error: "invalid url" });
  }
  result.short_url = Math.floor(
    Math.random() * result.original_url.length
  ).toString();
  urls.push(result);
  res.status(200).json(result);
});

app.get("/api/shorturl/:url", (req, res) => {
  const short_url = req.params.url;
  const doc = urls.find((urlObj) => urlObj.short_url === short_url);
  if (!doc) {
    res.status(400).json({ error: "invalid url" });
  }
  res.redirect(doc.original_url);
});

server.listen(process.env.PORT, () => {
  console.log("Server is listening to port: " + process.env.PORT);
});
