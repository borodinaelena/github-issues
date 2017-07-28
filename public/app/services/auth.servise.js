'use strict';
function auth() {
    angular
        .module('app')
        .factory('Auth', auth);

    auth.$inject = ['$http', '$state', '$localStorage', 'config'];

    function auth($http, $state, $localStorage, config) {

        return {
            login: function (data) {
                return $http.post(config.url + '/api/auth/login', data);
            },
            // logout: function () {
            //     return $http.get(config.url + '/api/auth/logout');
            // },
            logout: function () {
                return $http.get('/logout');
            },
            getUser: function () {
                return getUser();
            },
            isAuthorized: function () {
                return isAuthorized();
            },
            checkAccess: function (event, toState, toParams, fromState, fromParams) {
                return checkAccess(event, toState, toParams, fromState, fromParams);
            },
        };

        /////////

        function urlBase64Decode(str) {
            let output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }

            return window.atob(output);
        }

        function getUser() {
            let token = $localStorage.token;
            let user = {};

            if (typeof token !== 'undefined') {
                let encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }

            return user;
        }

        function isAuthorized() {
            let user = getUser();

            if ((!_.isEmpty(user)) && (user.exp > moment().unix())) {
                return true;
            }

            delete $localStorage.token;
            return false;
        }

        function checkAccess(event, toState, toParams, fromState, fromParams) {
            if (toState.data !== undefined) {
                if (toState.data.authorized !== undefined && toState.data.authorized && !isAuthorized()) {
                    event.preventDefault();
                    $state.go('login');
                }

                if (toState.data.role !== undefined) {
                    if (!isAuthorized()) {
                        event.preventDefault();
                        $state.go('login');
                    }

                    const user = getUser();

                    if (toState.data.role != user.role) {
                        event.preventDefault();
                        defaultRedirect();
                    }
                }
            }
        }
    }
};
auth();
