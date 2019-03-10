var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 9100;

app.get('/bob', function(req, res){
  res.sendFile(__dirname + '/bob.html');
});

app.get('/alice', function(req, res){
  res.sendFile(__dirname + '/alice.html');
});

io.on('connection', function(socket){
  // 监听 alice 信道
  socket.on('alice', function(msg){
    console.log('from bob msg', msg);
    // 发给 Client 端的 alice 信道
    io.emit('alice', msg);
  });
  // 监听 bob 信道
  socket.on('bob', function(msg){
    console.log('from alice msg', msg);
    // 发给 Client 端的 bob 信道
    io.emit('bob', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
