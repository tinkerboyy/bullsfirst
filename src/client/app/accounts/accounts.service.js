(function() {
    'use strict';

    angular
        .module('bullsfirst.accounts')
        .factory('accountsService', accountsService);

    accountsService.$inject = ['$q', '$http'];

    function accountsService($q, $http) {

        var service = {
            getAllAccounts: getAllAccounts
        };

        function getAllAccounts() {
            return $http.get('/api/accounts')
                .then(getAccountsComplete)
                .catch(function(message) {
                    console.log(message);
                });

            function getAccountsComplete(data) {
                return data.data;
            }
        }

        return service;
    }
})();