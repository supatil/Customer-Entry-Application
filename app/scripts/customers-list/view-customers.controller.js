(function () {


    angular.module('myApp')
        .controller('ViewCustomers', ViewCustomersfn);

    ViewCustomersfn.$inject = ['$scope', '$location', 'DataService', 'startFromFilter'];
    function ViewCustomersfn($scope, $location, DataService, startFromFilter) {
        $scope.customers = [];
        $scope.isMessage = false;
        $scope.viewby = '12';
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.message = "There are no records at this time. To add records please click on 'Add Customer' button."
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1;
        }

        DataService.getCustomers().then(function (data) {
            if (data.length === 0) {
                $scope.isMessage = true;
            } else {
                $scope.isMessage = false;
            }
            $scope.customers = data;
            $scope.totalItems = $scope.customers.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.maxSize);
        })

        $scope.addCustomer = function () {
            $location.path('/addcustomer');
        }
        $scope.delete = function (id) {
            if (id) {
                for (var i = 0; i < $scope.customers.length; i++) {
                    if ($scope.customers[i].id === id) {
                        $scope.customers.splice(i, 1);
                    }
                }
            }
            else {
                $scope.customers = [];
            }

            if ($scope.customers.length === 0) {
                $scope.isMessage = true;
            } else {
                $scope.isMessage = false;
            }

            DataService.deleteCustomer($scope.customers).then(function (data) {
                $scope.totalItems = data.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.maxSize);
            });
        }
    }
})();