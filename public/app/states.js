'use strict'
angular
  .module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state({
        name: 'startPage',
        url: '/',
        templateUrl: './app/issues/issues.template.html',
        controller: 'IssuesController',
        controllerAs: 'Issues',       
      })
  });