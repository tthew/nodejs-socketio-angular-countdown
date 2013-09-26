var io = require('socket.io').listen(3333)
	, Stopwatch = require('./stopwatch')
	;

var startTime;
var stopwatch = new Stopwatch();
stopwatch.on('tick:stopwatch', function(time) {
  io.sockets.emit('time', { time: time });
});

stopwatch.on('reset:stopwatch', function(time) {
  io.sockets.emit('time', { time: time });
});

// 5 mins
stopwatch.setTime(3000);

// stopwatch.start();

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

	socket.on('click:setTime', function(ms) {
		stopwatch.stop();
		stopwatch.setTime(ms);
		io.sockets.emit('time', {time: stopwatch.getTime() });
	});
});
