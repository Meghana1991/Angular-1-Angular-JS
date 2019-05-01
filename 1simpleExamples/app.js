var mod	=	angular.module("tryMe",[]);

mod.controller("tryMeController",['$scope',function($scope,$location){
	$scope.displayName = function(){
		$scope.me = "me"
		return "hi "+$scope.name;
	}
}]);