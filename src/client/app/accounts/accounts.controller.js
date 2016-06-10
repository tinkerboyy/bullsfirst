(function() {
    'use strict';

    angular
        .module('bullsfirst.accounts')
        .controller('Accounts', Accounts);

    Accounts.$inject = ['$state', 'accountsService', '$timeout'];

    function Accounts($state, accountsService, $timeout) {
        var vm = this;
        vm.rows = [];

        vm.addAccount = addAccount;
        vm.refresh = refreshPage;

        getAccounts();

        // get all accounts
        function getAccounts() {
            vm.totals = {
                name: '',
                marketValue: 0,
                cash: 0,
                legend: 'none'
            };

            accountsService.getAllAccounts().then(function(data) {
                vm.rows = data;
                $timeout(function() {
                   angular.forEach(vm.rows, function(row) {
                       vm.totals.marketValue += row.marketValue;
                       vm.totals.cash += row.cash;
                   });
               }, 0);
            });
        }

        // add new account
        function addAccount() {
            var test = {
                name: 'New Account',
                marketValue: Math.random() * 100000,
                cash: Math.random() * 400000,
                legend: 'cyan'
            };

            vm.rows.push.call(vm.rows, test);
            vm.totals.marketValue += test.marketValue;
            vm.totals.cash += test.cash;
        }

        function refreshPage() {
            getAccounts();
        }

    }
})();