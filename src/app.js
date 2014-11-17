var app = angular.module("app", ["ngRoute"]);


// Routing

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/top.html'
      }).
      when('/operator', {
        templateUrl: 'partials/operator.html',
        controller: 'OperatorCtrl'
      }).
      when('/@:name', {
        templateUrl: 'partials/user.html',
        controller: 'UserCtrl'
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


app.controller('UserCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.init = function() {
    $scope.name = $routeParams.name;

    $scope.sango = new Sango(config.sango_server,
                             config.sango_user, config.sango_pass);
    var scope = $scope;
    $scope.sango.connect(
      name,
      function(data) {
        var topic = config.sango_user + "/data";
        $scope.sango.subscribe(topic, function(val){
          $scope.currentStatus = val;
          $scope.$apply();
        });
      },
      function(data) {console.log('failure'); console.log(data)});

// var name = window.location.hash.substr(1);
// $("#name").text(name);
//
  };

  $scope.init();
}]);
