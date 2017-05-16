(function () {

    angular.module('myApp')
        .controller('EditController', EditControllerFn);

    EditControllerFn.$inject = ['$scope', '$stateParams', 'DataService', '$uibModal'];
    function EditControllerFn($scope, $stateParams, DataService, $uibModal) {

        DataService.getCustomerById($stateParams.customerId).then(function (data) {
            $scope.customer = data;
        });

        $scope.update = function (isFormValid) {
            if (isFormValid) {
                DataService.updateCustomer($scope.customer, $stateParams.customerId).then(function (data) {
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