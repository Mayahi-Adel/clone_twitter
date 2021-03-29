const express = require("express");
const router = require("./routes/routes");
const ejs = require("ejs");

const server = express();

const PORT = 3000 || process.env.PORT;

server.engine('ejs', ejs.renderFile);
server.set("views", "./src/views");

server.use(express.static("./src/public"));

server.use(express.urlencoded());

server.use(router);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

