angular.module("Todoify", ["ngMaterial", "LocalStorageModule"])

.config(function($mdAriaProvider, localStorageServiceProvider) {
	$mdAriaProvider.disableWarnings();
	localStorageServiceProvider.setPrefix('');
})

.factory("$ls", function(localStorageService) {
	return localStorageService;
})

.controller("Background", function($scope, $ls) {
	$scope.interval = 60000 * 30;
	($scope.getWall = function() {
		if(!$ls.get("wall") || Date.now() - $ls.get("wallDate") > $scope.interval) {
			$ls.set("wall", walls[Math.floor(Math.random() * walls.length)]);
			$ls.set("wallDate", Date.now())	;
		}
		$ls.bind($scope, "wall");
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

.controller("Todos", function($scope, $timeout, $ls) {
	if(!$ls.get("todos")) $ls.set("todos", []);
	$ls.bind($scope, "todos");
	$scope.keepOpen = function($event) {
		if($event.target.nodeName != "MD-ICON")
			$timeout(function() { $scope.state = true; }, 10);
	};
});