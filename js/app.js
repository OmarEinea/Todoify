Vue.use(VueMaterial);
var vue = new Vue({
	el: "#app",
	data() {
		return {
			percent: this.getPercent(),
			wall: this.getWall(),
			todos: [{"text":"Finish This Todo App","date":"Indefinite"},{"text":"Get The Driver License","date":"Indefinite"},{"text":"Get Beard Oil & Car Vacuum","date":"Indefinite"},{"text":"Collect Research Questions","date":"12/3"}],
			todo: this.clearTodo(),
			prayers: []
		};
	},
	mounted() {
		setInterval(this.getPercent, 30000);
		
		var cells = document.getElementsByClassName("MPtimetable")[0].getElementsByTagName("td");
		for(var i = 2; i < cells.length; i += 2)
			this.prayers.push(this.calcMins(cells[i].innerText));
	},
	methods: {
		getWall() {
			return this.wall = walls[Math.floor(Math.random() * walls.length)];
		},
		getPercent() {
			var percent = Math.round(100 * (this.calcMins(new Date()) - this.calcMins("10:00")) / this.calcMins("13:30"));
			return this.percent = percent > 100 ? '+' + percent % 100 : percent;
		},
		calcMins(time) {
			if(typeof(time) == "string") {
				time = time.split(":");
				return +time[1] + time[0] * 60;
			} else return time.getMinutes() + time.getHours() * 60;
		},
		clearTodo() {
			return this.todo = { text: '', date: null};
		}
	}
});

/*angular.module("Todoify", ["ngMaterial", "LocalStorageModule"])

.config(function($mdAriaProvider, localStorageServiceProvider) {
	$mdAriaProvider.disableWarnings();
	localStorageServiceProvider.setPrefix('');
})

.factory("$ls", function(localStorageService) {
	return localStorageService;
})

.factory("$calc", function() {
	return function(time) {
		if(typeof(time) == "string") {
			time = time.split(":");
			return +time[1] + time[0] * 60;
		} else return time.getMinutes() + time.getHours() * 60;
	};
})

.controller("Background", function($scope, $ls, $interval) {
	$ls.bind($scope, "wall");
	var minute = 60000, changeWall = function() {
		$scope.wall = walls[Math.floor(Math.random() * walls.length)];
		$ls.set("wallDate", Date.now())	;
	};
	if(!$ls.get("wall") || Date.now() - $ls.get("wallDate") > 40 * minute)
		changeWall();
	$interval(changeWall, 20 * minute);
})

.controller("Time", function($scope, $calc, $interval) {
	var startTime = $calc("10:00"); // AM
	var workHours = $calc("13:30"); // 13.5 Hours
	($scope.updateTime = function() {
		$scope.percent = Math.round(100 * ($calc(new Date()) - startTime) / workHours);
	})();
	$interval($scope.updateTime, 30000);
})

.controller("Todos", function($scope, $ls, $timeout, $interval) {
	if(!$ls.get("todos")) $ls.set("todos", []);
	$ls.bind($scope, "todos");
	($scope.clear = function() {
		$scope.todo = { text: '', date: null };
	})();
	$scope.add = function() {
		var d = $scope.todo.date;
		$scope.todo.date = d ? d.getDate() + '/' + (d.getMonth() + 1) : "Indefinite";
		$scope.todos.push($scope.todo);
		$scope.clear();
	};
	$scope.remove = function(index) {
		$scope.todos.splice(index, 1);
	};
	$scope.keepOpen = function() {
		$interval(function() { $scope.state = true }, 10);
	};
})

.controller("Prayer", function($scope, $calc) {
	var times = [], cells = document.getElementsByClassName("MPtimetable")[0].getElementsByTagName("td");
	for(var i = 2; i < cells.length; i += 2)
		times.push($calc(cells[i].innerText));
});*/