
var express = require("express");

var path = require("path");
var session = require('express-session');

var app = express();
var bodyParser = require('body-parser');
const server = app.listen(1337);
const io = require('socket.io')(server);
var count = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render("index");
})

io.on('connection', function (socket) {
  socket.on('receivingclick', function(data) {
    // console.log("rawr");
    count += 1;
    io.emit('updateAllClients', {count: count});
  });
  socket.on('clearingclick', function(data) {
    // console.log("rawr clear");
    count = 0;
    io.emit('updateAllClients', {count: count});
  });
});
