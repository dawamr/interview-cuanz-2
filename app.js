const express = require("express");
const app = express();

const cors = require("cors");
const fs = require('fs')
const logger = require('morgan');
const path = require('path')
const config = require('./config/setting');

var corsOptions = {
    origin: "http://localhost:4001"
};

app.use(logger('dev'));

app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true, parameterLimit: 5000 }));

const routers = require("./routers");

app.use(routers);

app.listen(config.port, function(){
    console.log(`Server is running on port ${config.port}`);
})

module.exports = app;