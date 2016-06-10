(function() {
    'use strict';

    angular
        .module('bullsfirst.accounts')
        .run(appRun)
        .config(getStates);

    getStates.$inject = ['$stateProvider', '$urlRouterProvider'];

    function getStates($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('accounts', {
                url: '/',
                templateUrl: 'app/accounts/accounts.html',
                controller: 'Accounts',
                controllerAs: 'vm'
            });
    }

    appRun.$inject = ['$state'];

    function appRun($state) {
        console.log($state);
    }
})();