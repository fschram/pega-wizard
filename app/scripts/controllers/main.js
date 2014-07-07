'use strict';

angular.module('pegaWizardApp', ['mgo-angular-wizard']).controller('WizardCtrl', function($scope, $http, WizardHandler) {
  $scope.finished = function() {
    //alert('Wizard finished :)');
  };

  $scope.logStep = function() {
    console.log('Step continued');
  };

  $scope.goBack = function() {
    WizardHandler.wizard().goTo(0);
  };

  $scope.getOptions = function() {
//    $http.get('http://www.iNorthwind.com/Service1.svc/getAllCustomers')
//      .success(function(data) {
//        $scope.loans = data;
//        //$scope.selectedLoan = $scope.loans[0].CustomerID;
//      });
    $http.post('/prweb/PRRestService/LoansOrigination/LoansOrigination/CreateLoanApplicationAndGetOptions', { customer : $scope.user }).
    success(function(data, status, headers, config) {
      console.log(data, status, headers, config);

      WizardHandler.wizard().next();
    }).
    error(function(data, status, headers, config) {
            console.log('an error has occured while requesting options', data, status, headers, config);
    });
  };

  $scope.master = {};

  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.isUnchanged = function(user) {
    return angular.equals(user, $scope.master);
  };

  $scope.reset();
})
  .config(['$httpProvider',
    function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);
