// Imports
const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const { flash } = require('express-flash-message');

const router = require('./routes/routes');

const server = express();

const PORT = 3000;

server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true when we will use https
  }));

// apply express-flash-message middleware // always use after config express-session
server.use(flash({ sessionKeyName: 'flashMessage' }));

server.engine('ejs', ejs.renderFile);
server.set("views", "./src/views");

server.use(express.static("./src/public"))

server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.use(router)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

