'use strict';

angular.module('myApp')
  .controller('questionCtrl', ['$scope','$http', function($scope,$http) {
    
// functions
	$scope.finished = function(){
		console.log("quesionaire finished")
	}
  }]);