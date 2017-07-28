'use strict'
angular
  .module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state({
        name: 'startPage',
        url: '/',
        template: '<h1> hello </h1>'
        // templateUrl: '',
        // controller: 'StartPageController',
        // controllerAs: 'StartPage',       
      })
  });