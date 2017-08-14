'use strict'
angular
  .module('app')
  .factory('IssuesServise', ['$resource', function ($resource) {
      return $resource('api/github/issues/:action/:fullname/:userId', null,
      {
        'update': { method: 'PUT' }
      });
  }]);