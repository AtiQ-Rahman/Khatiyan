const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('express-pdf');

const { mongoose } = require('./db.js');
var khatiyanController = require('./controllers/khatiyanController.js');

var app = express();
app.use(bodyParser.json());
app.use(pdf);
app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/khatiyans', khatiyanController);
