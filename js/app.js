angular.module("Todoify", ["ngMaterial"])

.config(function($mdAriaProvider) {
	$mdAriaProvider.disableWarnings();
})

.factory("$ls", function($window) {
	return $window.localStorage;
})

.controller("Background", function($scope, $ls) {
	$scope.interval = 60000 * 30;
	($scope.getWall = function() {
		if(!$ls.wallPath || Date.now() - $ls.wallDate > $scope.interval) {
			$ls.wallPath = walls[Math.floor(Math.random() * walls.length)];
			$ls.wallDate = Date.now();
		}
		$scope.wall = $ls.wallPath;
	})();
})

.controller("Time", function($scope, $interval) {
	// Store milliseconds of today at 10am until 11:30pm
	var todayStart = (new Date()).setHours(10, 0, 0, 0);
	var workHours = 36000 * 13.5;
	($scope.updateTime = function() {
		$scope.percent = Math.round((Date.now() - todayStart) / workHours);
	})();
	$interval($scope.updateTime, 30000);
})

.controller("Todos", function($scope, $timeout, $interval) {
	$scope.state = false;
	$scope.todos = [];
	$scope.keepOpen = function($event) {
		if($event.target.nodeName != "MD-ICON")
			$timeout(function() { $scope.state = true; }, 10);
	};
});