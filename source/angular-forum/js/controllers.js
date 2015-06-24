angular.module('myApp').controller('forumController', ['$scope', 'appFactory',  function($scope, appFactory) {
  $scope.posts = appFactory.data;
  $scope.err = '';
  $scope.addPost = function(a,b,c) {
    appFactory.addData(a,b,c);
    $scope.err = appFactory.err;
  } 
}]);

angular.module('myApp').controller('userController', ['$scope', '$routeParams', 'appFactory', function($scope, $routeParams, appFactory) {
  $scope.id = $routeParams.id;
  $scope.posts = appFactory.data;
}]);
