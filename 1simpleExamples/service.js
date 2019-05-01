
var mod	=	angular.module("tryMe",[]);

mod.controller("firstController",['$scope',function($scope){
	$scope.name = "Sai";
}]);

mod.controller("secondController",['$scope',function($scope){
	$scope.name = "Manju";
}]);

mod.controller("thirdController",['$scope',function($scope){
	$scope.name = "Matsp";
}]);