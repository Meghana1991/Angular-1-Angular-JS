//Prototype Inheritance
var mod	=	angular.module("tryMe",[]);

mod.controller("firstController",['$scope',function($scope){
	$scope.name = "Sai";
}]);

mod.controller("secondController",['$scope',function($scope){
	$scope.name = "Manju";
}]);

mod.controller("thirdController",['$scope',function($scope){
	//$scope.name = "Matsp";
	console.log($scope.name)
}]);

//If any value or function which we are referencing are not in the current scope then it searches for the parent scope and so on upwards
//In the thirdController, there is no $scope.name and still we get $scope.name from the secondController