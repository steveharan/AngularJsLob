(function () {
        "use strict";

        angular
            .module("productManagement")
            .controller("ProductDetailCtrl",
                        ProductDetailCtrl);

        function ProductDetailCtrl() {
            var vm = this;

            vm.product = {
                "productId": 2,
                "productName": "Garden Cart",
                "productCode": "sdf-23",
                "releaseDate": "March 18, 2010",
                "description": "bla bla bla",
                "cost": 20.00,
                "price": 40.00,
                "category": "garden",
                "tags": ["abc", "123"],
                "imageUrl": "https://openclipart.org/image/300px/svg_to_png/219823/Chocolateicecreamforopenclipart.png"
            };

            vm.title = "Product Detail: " + vm.product.productName;

            if (vm.product.tags) {
                vm.product.tagList = vm.product.tags.toString();
            }
        }
    }()

);
