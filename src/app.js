var app = angular.module("app", ["ngRoute"]);


// Routing

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/top.html'
        // ,controller: 'PhoneListCtrl'
      }).
      when('/operator', {
        templateUrl: 'partials/operator.html',
        controller: 'OperatorCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


// Controllers

app.controller('OperatorCtrl', ['$scope', function($scope) {
  $scope.init = function() {
    $scope.topic = config.sango_user + "/data";
    $scope.sango = new Sango(config.sango_server, config.sango_user, config.sango_pass);
    $scope.sango.connect(
      'operator',
      function(data){console.log('connected');},
      function(data){console.log('connecton failed'); console.log(data);});
  };

  $scope.updateStatus = function(status) {
    $scope.sango.publish($scope.topic, status, true);
    $scope.status = status;
  };

  $scope.init();
}]);
