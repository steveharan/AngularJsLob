(function () {
    "use strict";
    var toastrOptions = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    var app = angular.module(
        "productManagement",
        [
            "common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "firebase",
            "angularCharts",
            "productResourceMock"
        ]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "System Error: " + exception.message;
                        $delegate(exception, cause);
                        toastr.error(exception.message);
                    };
                }]);
    });

    app.config([
            "$stateProvider",
            "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state("productList", {
                    url: "/products",
                    templateUrl: "app/products/list/productListView.html",
                    controller: "ProductListCtrl as vm"
                })
                .state("productEdit", {
                    abstract: true,
                    url: "/products/edit/:productId",
                    templateUrl: "app/products/edit/productEditView.html",
                    controller: "ProductEditCtrl as vm",
                    resolve: {
                        productResource: "productResource",
                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get(
                                {productId: productId}).$promise;
                        }
                    }
                })
                .state("productEdit.info", {
                    url: "/info",
                    templateUrl: "app/products/edit/productEditInfoView.html"
                })
                .state("productEdit.price", {
                    url: "/price",
                    templateUrl: "app/products/edit/productEditPriceView.html"
                })
                .state("productEdit.tags", {
                    url: "/tag",
                    templateUrl: "app/products/edit/productEditTagView.html"
                })
                .state("priceAnalytics", {
                    url: "/priceAnalytics",
                    templateUrl: "app/prices/priceAnalyticsView.html",
                    controller: "PriceAnalyticsCtrl",
                    resolve: {
                        productResource: "productResource",
                        products: function (productResource) {
                            return productResource.query(success, failure).$promise;
                            function success() {
                                toastr.options = toastrOptions;
                                toastr.info('Data Loaded Successfully');
                            };

                            function failure(response) {
                                toastr.options = toastrOptions;
                                toastr.error(response.config.method + ' ' + response.config.url + ' is not available');
                            };
                        }
                    }
                })
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "app/products/Detail/productDetailView.html",
                    controller: "ProductDetailCtrl as vm",
                    resolve: {
                        productResource: "productResource",
                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get(
                                {productId: productId}).$promise();

                        }
                    }
                })
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
            });
            $urlRouterProvider.otherwise("/");
        }]
    );
}());