(function () {
        "use strict";

        angular
            .module("productManagement")
            .controller("ProductEditCtrl",
                        ["product", "$state", "$firebaseObject", ProductEditCtrl]);

        function ProductEditCtrl(product, $state, $firebaseObject) {
            var ref = new Firebase("https://steveharan.firebaseio.com/")

            var vm = this;

            vm.product = product;

            if (vm.product && vm.product.productId) {
                vm.title = "Edit: " + vm.product.productName;
            }
            else {
                vm.title = "New Product"
            }

            vm.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = !vm.opened;
            }

            vm.submit = function () {
                var productsRef = ref.child("products");
                if (vm.product && vm.product.productId) {
                    productsRef.set(
                        vm.product.toJSON()
                    );
                }
                else {
                    productsRef.push(
                        vm.product.toJSON()
                    );
                }
                vm.product.$save();
            }

            vm.cancel = function () {
                $state.go('productList');
            }


        }
    }()

);
