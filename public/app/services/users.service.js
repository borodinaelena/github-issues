'use strict'
angular
  .module('app')
  .factory('UsersServise', ['$resource', function ($resource) {
      return $resource('api/social/:action/:id', null,
      {
        'update': { method: 'PUT' }
      });
  }]);