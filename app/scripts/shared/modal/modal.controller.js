(function () {
    angular.module('myApp')
        .controller('ModalInstanceCtrl', ModalInstanceCtrlFn);

        ModalInstanceCtrlFn.$inject = ['$scope','$location', '$uibModalInstance'];
        function ModalInstanceCtrlFn($scope, $location, $uibModalInstance){

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                $location.path('/listcustomers');
            };            
        };
})();