(function () {
    "use strict";
    var app = angular.module(
        "productManagement",
        [
            "common.services",
            "ui.router",
            "productResourceMock"
        ]);

    app.config([
            "$stateProvider",
            "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("productList", {
                    url: "/products",
                    templateUrl: "app/products/productListView.html",
                    controller: "ProductListCtrl as vm"
                })
                .state("productEdit", {
                    url: "/products/edit/:productId",
                    templateUrl: "app/products/productEditView.html",
                    controller: "productEditCtrl as vm"
                })
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "app/products/productDetailView.html",
                    controller: "ProductDetailCtrl as vm"
                })
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
            });
            $urlRouterProvider.otherwise("/");
        }]
    );
}());