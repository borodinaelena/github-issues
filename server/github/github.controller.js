'use strict';

const request = require('request-promise');

function getUser(access_token, username) {
  return request({
    uri: 'https://api.github.com/users/' + username,
    qs: {
      access_token: access_token,
      // clientID: '35369240b37657fba828',
      // clientSecret: '4344fbe76ae5c17b6ae64a4237c765a53ed4b816',
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  });
}

function getReposForUser(access_token, username) {

  return request({
    uri: 'https://api.github.com/users/' + username + '/repos',
    qs: {
      access_token: access_token,
      // clientID: '35369240b37657fba828',
      // clientSecret: '4344fbe76ae5c17b6ae64a4237c765a53ed4b816',
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  })
}
function getOrgsForUser(access_token, username) {
  return request({
    uri: 'https://api.github.com/users/' + username + '/orgs',
    qs: {
      access_token: access_token,
      // clientID: '35369240b37657fba828',
      // clientSecret: '4344fbe76ae5c17b6ae64a4237c765a53ed4b816',
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  })
}
function getIssuesForRepo(access_token, repo) {
  console.log('https://api.github.com/repos/' + repo + '/issues')
  return request({
    uri: 'https://api.github.com/repos/' + repo + '/issues',
    qs: {
      access_token: access_token
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  })
}

module.exports = {
  getUser: getUser,
  getReposForUser: getReposForUser,
  getIssuesForRepo: getIssuesForRepo,
  getOrgsForUser: getOrgsForUser
}

