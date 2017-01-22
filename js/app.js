angular.module("Todoify", ["ngMaterial"])
	.controller("Background", function($scope) {
		$scope.getWall = function() {
			return walls[Math.floor(Math.random() * walls.length)];
		};
	});