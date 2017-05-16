(function () {


    angular.module('myApp')
        .filter('startFrom', startFromFn);

    startFromFn.$inject = [];
    function startFromFn() {
        return function (customersResponse, start) {

            if (customersResponse) {
                return customersResponse.slice(start);
            }
            return [];
        };
    }
})();