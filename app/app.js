(function () {
    "use strict";
    var app = angular.module(
        "productManagement",
        [
            "common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "firebase",
            "productResourceMock"
        ]);

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
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "app/products/Detail/productDetailView.html",
                    controller: "ProductDetailCtrl as vm",
                    resolve: {
                        productResource: "productResource",
                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get(
                                {productId: productId}).$promise;
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