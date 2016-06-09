var app = angular.module('webApp', ['ngSanitize'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

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
    $scope.orgLogo = '<img src="'+$org.logo+'" class="logo">';

    ga('send', 'event', $org.name, 'click');
    var time = Math.round(performance.now());
    ga('send', 'timing', $org.name, 'load', time);

    if($mobile) {
        $('html, body').animate({
          scrollTop: $('#org-details').offset().top
        }, 0);
    }
  }
})
