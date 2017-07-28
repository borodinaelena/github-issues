
'use strict';

function app() {
    angular
        .module('app', [
            'ui.router',
            'ngResource',
            'ngStorage',
            'ngMessages',
        ]);

    angular
        .module('app')
        .constant('config', {
            url: 'http://${window.location.hostname}:${window.location.port}',
        });

    angular
        .module('app')
        .config(configure);

    angular
        .module('app')
        .run(runing);
    ////////////

    configure.$inject = ['$httpProvider', '$locationProvider', '$urlRouterProvider'];

    function configure($httpProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push(requestInterceptor);

        function requestInterceptor($q, $localStorage, $rootScope) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }

                    return config;
                },
                requestError: function (config) {
                    return config;
                },
                response: function (res) {
                    return res;
                },
                responseError: function (res) {
                    if (res.status === 401) {
                        delete $localStorage.token;

                        return $rootScope.$state.go('startPage');
                    }
                    return $q.reject(res);
                }
            };
        }
    }

    runing.$inject = ['$rootScope', '$state', '$stateParams', 'Auth'];

    function runing($rootScope, $state, $stateParams, Auth) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        let user = Auth.getUser();
        // check user authorization and role
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                Auth.checkAccess(event, toState, toParams, fromState, fromParams);
            }
        );
    }

};

app();
