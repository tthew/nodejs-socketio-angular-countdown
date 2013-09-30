angular.module('countdownApp')
.directive('countdown', function ($timeout, dateFilter) {
	return {
		restrict: 'E',
		templateUrl: 'scripts/directives/countdown/countdown.html',
		controller: function ($scope, $element, $attrs) {
			console.log($attrs.backend);
			var backendUrl = $attrs.backend || 'http://localhost:3333';
			var socket = io.connect(backendUrl);

			socket.on('time', function (data) {
				$scope.timer = data.time;
				$scope.$apply();
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

			$scope.setTimerToFiveMinutes = function () {
				socket.emit('click:setTime', 300000);
			};
			$scope.setTimerToFifteenMinutes = function () {
				socket.emit('click:setTime', 900000);
			};
		}
	};

});
