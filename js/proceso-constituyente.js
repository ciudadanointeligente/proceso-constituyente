var app = angular.module('webApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('homepageController', function($scope,$http){
  $scope.orgs = [];
  $scope.orgInfo = [];
  $scope.bgColor = '#FFF';
  $scope.bgCardColor = "#FFF";

  $http.get('/data/orgs.json')
    .success(function (data) {
      $scope.orgs = data
    })
    .error(function (){
      $scope.messages = { response: false, message: 'no org loaded' }
    });

  $scope.getOrgInfo = function ($org) {
    $scope.bgColor = $org.bg_color;
    $scope.bgCardColor = $org.bg_card_color;
    $scope.orgInfo = $org.questions;
    $scope.orgLogo = $org.logo;
  }
})
