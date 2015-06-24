angular.module('myApp', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/forum', {templateUrl: 'partials/forum.html',controller: 'forumController'}).
    when('/user/:id', {templateUrl: 'partials/user.html', controller: 'userController'}).
    otherwise({redirectTo: '/forum'});
}]);
