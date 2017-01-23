angular.module("Todoify", ["ngMaterial"])

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
});