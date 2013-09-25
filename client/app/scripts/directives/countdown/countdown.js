angular.module('countdownApp')
.directive('countdown', function ($timeout, dateFilter) {
	return {
		restrict: 'E',
		templateUrl: 'scripts/directives/countdown/countdown.html',
		controller: function ($scope, $element, $attrs) {
			var socket = io.connect('http://192.168.1.64:3333');
			var timer;

			$scope.timer = timer;

			socket.on('time', function (data) {
				console.log($scope.timer);
				console.log(data.time);
				$scope.timer = data.time;

				$scope.$apply();
				// console.log($scope.time);
			});

			$scope.start = function () {
				socket.emit('click:start');
			};

			$scope.stop = function () {
				socket.emit('click:stop');
			};

			$scope.reset = function () {
				socket.emit('click:reset');
			};
		}
	};

});
