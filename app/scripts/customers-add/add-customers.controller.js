(function () {

    angular.module('myApp')
        .controller('AddCustomer', AddCustomerFn);

    AddCustomerFn.$inject = ['$scope', '$location', 'DataService', '$uibModal'];
    function AddCustomerFn($scope, $location, DataService, $uibModal) {

        $scope.add = function (isFormValid) {
            if (isFormValid) {
                DataService.saveCustomer($scope.customer).then(function (data) {
                    addCustomerForm.reset();
                    $scope.openSaveModal('sm');
                }, function (err) {
                    console.log(err);
                });
            }
        }

        $scope.openSaveModal = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'scripts/shared/modal/modal.template.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                    }
                },
                backdrop: 'static'
            });
        };
    }
})();