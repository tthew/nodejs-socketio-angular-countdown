var io = require('socket.io').listen(3333)
	, Stopwatch = require('./stopwatch')
	;

var stopwatch = new Stopwatch();
stopwatch.on('tick:stopwatch', function(time) {
  io.sockets.emit('time', { time: time });
});

stopwatch.on('reset:stopwatch', function(time) {
  io.sockets.emit('time', { time: time });
});

// 15 mins
stopwatch.setTime(900000);

// 5 mins
stopwatch.setTime(300000);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('time', { time: stopwatch.getTime() });

  socket.on('click:start', function () {
    stopwatch.start();
  });

  socket.on('click:stop', function () {
    stopwatch.stop();
  });

  socket.on('click:reset', function () {
    stopwatch.reset();
  });
});
