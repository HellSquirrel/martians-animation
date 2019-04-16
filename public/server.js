const express = require("express");
const path = require("path");
const server = express();

server.use("/", express.static(__dirname));
server.listen(process.env.PORT);

server.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "index.html"))
);
