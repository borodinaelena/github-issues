'use strict'
angular
  .module('app')
  .factory('GithubServise', ['$resource', function ($resource) {
      return $resource('api/github/:action/:param', null,
      {
        'update': { method: 'PUT' }
      });
  }]);