(function () {

    angular.module('myApp', ['ngMessages','ui.router','ui.bootstrap'])
        .config(moduleConfig);

    moduleConfig.$inject = ['$stateProvider','$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'scripts/home/home.template.html',
                controller: 'HomeController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'scripts/about/about.template.html',
                controller: 'AboutUsController'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'scripts/contact/contact.template.html',
                controller: 'ContactController'
            })
            .state('customersview', {
                url:'/listcustomers',
                templateUrl:'scripts/customers-list/view-customers.template.html',
                controller:'ViewCustomers'
            })
              .state('customersedit', {
                url:'/listcustomers/:customerId',
                templateUrl:'scripts/customers-edit/edit-customers.template.html',
                controller:'EditController'
            })
             .state('customeradd', {
                url:'/addcustomer',
                templateUrl:'scripts/customers-add/add-customers.template.html',
                controller:'AddCustomer'
            });
           $urlRouterProvider.otherwise('/home');

    }
})();