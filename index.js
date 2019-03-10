var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 9200;

app.get('/bob', function(req, res){
  res.sendFile(__dirname + '/bob.html');
});

app.get('/alice', function(req, res){
  res.sendFile(__dirname + '/alice.html');
});

io.on('connection', socket => {
  // 监听 alice 信道
  console.log('client connection')
  socket.on('alice', msg => {
    console.log('message from bob', msg);
    // 发给 Client 端的 alice 信道
    io.emit('alice', msg);
  });
  // 监听 bob 信道
  socket.on('bob', msg => {
    console.log('message from alice', msg);
    // 发给 Client 端的 bob 信道
    io.emit('bob', msg);
  });
});

http.listen(port, () => {
  console.log('listening on http://127.0.0.1:' + port);
});
