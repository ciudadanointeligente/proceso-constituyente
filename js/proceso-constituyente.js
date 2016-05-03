var app = angular.module('webApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('homepageController', function($scope,$http){
  $scope.orgs = [];
  $scope.orgInfo = [];
  $scope.bgColor = '#FFF';
  $scope.bgCardColor = "#FFF";
  $scope.orgLogo = '';

  $http.get('/data/orgs.json')
    .success(function (data) {
      $scope.orgs = data
    })
    .error(function (){
      $scope.messages = { response: false, message: 'no org loaded' }
    });

  $scope.getOrgInfo = function ($org, $mobile) {
    $scope.bgColor = $org.bg_color;
    $scope.bgCardColor = $org.bg_card_color;
    $scope.orgInfo = $org.questions;
    $scope.orgLogo = $org.logo;

    ga('send', 'event', $org.name, 'click');

    if($mobile) {
        $('html, body').animate({
          scrollTop: $('#org-details').offset().top
        }, 0);
    }
  }
})
