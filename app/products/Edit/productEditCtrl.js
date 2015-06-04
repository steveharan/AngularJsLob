(function () {
        "use strict";

        angular
            .module("productManagement")
            .controller("ProductEditCtrl",
                        ["product", "$state", "productServices", "$firebaseObject", ProductEditCtrl]);

        function ProductEditCtrl(product, $state, productServices, $firebaseObject) {

            var toasterOptions = {
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
            }

            var ref = new Firebase("https://steveharan.firebaseio.com/")

            var vm = this;

            vm.product = product;

            vm.priceOption = "percent";

            vm.marginPercent = function () {
                return productServices.calculateMarginPercent(vm.product.price, vm.product.cost);
            }

            vm.calculatePrice = function () {
                var price = 0;

                if (vm.priceOption == 'amount') {
                    price = productServices.calculatePriceFromMarkupAmount(vm.product.cost,vm.markupAmount);
                }
                else {
                    price = productServices.calculatePriceFromMarkupPercent(vm.product.cost,vm.markupPercent);
                }
                vm.product.price=price;
            }

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

            vm.submit = function (isValid ) {
                if (isValid) {
                    vm.product.$save(function (data) {
                        toastr.options = toasterOptions;
                        toastr.success("Save Successful");
                    });
                }
                else {
                    toastr.options = toasterOptions;
                    toastr.error("There is some missing or invalid data on this form");
                }
            }

            vm.cancel = function () {
                $state.go('productList');
            }

            vm.addTags = function (tags) {
                if (tags) {
                    var array = tags.split(',');
                    vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                    vm.newTags = "";
                }
                else {
                    alert("Please enter some tags");
                }
            }

            vm.removeTag = function (idx) {
                vm.product.tags.splice(idx, 1);
            }

        }
    }()

);
