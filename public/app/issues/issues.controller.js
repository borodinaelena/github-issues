'use strict'

angular
  .module('app')
  .controller('IssuesController', IssuesController);
/* @ngInject */
function IssuesController($rootScope, $state, $stateParams, Auth, $localStorage, UsersServise, GithubServise, IssuesServise) {
  var vm = this;

  vm.users;
  vm.user;
  vm.orgs;
  vm.org;
  vm.repos;



  vm.repo;
  vm.issues;

  vm.issue = 0;

  vm.all = true;
  vm.one = true;

  var open = true;

  vm.checkIssue = function (issueNum) {
    if (open) {
      vm.issue = issueNum;
      open = !open;
    } else {
      vm.issue = 0;
      open = !open;
    }

  }
  function getUsers() {
    UsersServise
      .get({ action: 'all' })
      .$promise
      .then(function (res) {
        console.log(res);
        vm.users = res.data.users;
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  getUsers();

  vm.checkUser = function (userId) {
    UsersServise
      .get({ action: 'one', id: userId })
      .$promise
      .then(function (res) {
        console.log(res);
        vm.user = res.data.user;
        return vm.user;
      })
      .then(function (user) {
        // GithubServise
        //   .get({ action: 'orgs', param: user._id })
        //   .$promise
        //   .then(function (res) {
        //     console.log('orgs', res.data.orgs)
        //     vm.orgs = res.data.orgs;
        //   })
        GithubServise
          .get({ action: 'repos', param: user._id })
          .$promise
          .then(function (res) {
            console.log('repos', res.data.repos)
            vm.repos = res.data.repos;
            // vm.checkRepo('borodinaelena/test-work', 'one', 'test-work', false,true);
            vm.checkRepo('borodinaelena/test-work', 'all', 'All repositories', true, false);
          })
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  vm.checkRepo = function (full_name, action, name, all, one) {
    console.log('full_name', full_name),
      console.log('action', action)
    vm.repo = name;
    vm.all = all;
    vm.one = one;
    IssuesServise
      .get({ action: action, fullname: full_name, userId: vm.user._id })
      .$promise
      .then(function (res) {
        console.log('issues', res.data.issues)
        vm.issues = res.data.issues;
      })

  }

}