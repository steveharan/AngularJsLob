(function () {
        "use strict";

        angular
            .module("productManagement")
            .controller("ProductDetailCtrl",
                        ["product","productServices",ProductDetailCtrl]);

        function ProductDetailCtrl(product, productServices) {
            var vm = this;

            vm.product = product;

            vm.title = "Product Detail: " + vm.product.productName;

            vm.marginPercent = productServices.calculateMarginPercent(vm.product.price, vm.product.cost);

            if (vm.product.tags) {
                vm.product.tagList = vm.product.tags.toString();
            }
        }
    }()

);
