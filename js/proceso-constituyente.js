var app = angular.module('webApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('homepageController', function($scope,$http){
  $scope.orgs = [];
  $scope.orgInfo = [];

  $http.get('/data/orgs.json')
    .success(function (data) {
      $scope.orgs = data
    })
    .error(function (){
      $scope.messages = { response: false, message: 'no org loaded' }
    });

  $scope.getOrgInfo = function ($org) {
    $scope.orgInfo = $org.petitions
  }
})
