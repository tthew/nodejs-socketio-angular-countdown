angular.module('countdownApp')
.directive('countdown', function ($timeout, dateFilter) {
	return {
		restrict: 'E',
		templateUrl: 'scripts/directives/countdown/countdown.html',
		link: function (scope, element, attrs) {
		},

		controller: function ($scope, $element, $attrs) {
			var timeoutId;
			var timer;
			var startTime = $attrs.startTime || 10;

			var	time = angular.element($element.children()[0]);

			$scope.timer = new Date(1970,0,1);
			$scope.timer.setSeconds(startTime);

			$scope.start = function () {

				(function tick () {
					var currentTime = $scope.timer.getSeconds();
					if (currentTime > 0) {
						$scope.timer.setSeconds($scope.timer.getSeconds() - 1);
						timeoutId = $timeout(tick, 1000);
					} else {
					}
				})();

			}

			$scope.stop = function () {
				console.log('stop');
				$timeout.cancel(timeoutId);
			}

			$scope.reset = function () {
				console.log('reset');
			}
		}
	};

});
