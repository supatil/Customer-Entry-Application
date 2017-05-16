(function () {


    angular.module('myApp')
        .service('DataService', DataServiceFn);

    DataServiceFn.$inject = ['$http', '$q'];
    function DataServiceFn($http, $q) {
        var self = this;

        self.getCustomers = function () {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:1337/customers'
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                })
                return defer.promise;
        };

         self.getCustomerById = function (userId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:1337/customers/'+userId
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                })
                return defer.promise;
        };

        self.saveCustomer = function(customer){
            var defer = $q.defer();

            $http({
                method:'POST',
                url:'http://localhost:1337/customers',
                data: customer,
                headers:{'Content-Type':'application/json'}
            })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(error){
                defer.reject(error);
            })

            return defer.promise;
        };

        self.updateCustomer = function(customer, userId){
            var defer = $q.defer();

            $http({
                method:'PUT',
                url:'http://localhost:1337/customers/'+userId,
                data: customer,
                headers:{'Content-Type':'application/json'}
            })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(error){
                defer.reject(error);
            })

            return defer.promise;
        };

        self.deleteCustomer = function(customer){
            var defer = $q.defer();

            $http({
                method:'DELETE',
                url:'http://localhost:1337/customers',
                data: customer,
                headers:{'Content-Type':'application/json'}
            })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(error){
                defer.reject(error);
            })

            return defer.promise;
        };

    }
})();