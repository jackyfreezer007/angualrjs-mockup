var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.subFunc=function(){
  $http.get("message.json").then(function (response) {
      $scope.message = response.data.info;
  });
  }
  $scope.changeFun=function(){
    if($scope.search===undefined){
    	$scope.message="";
    }
  }
});