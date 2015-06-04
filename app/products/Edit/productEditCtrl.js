(function () {
        "use strict";

        angular
            .module("productManagement")
            .controller("ProductEditCtrl",
                        ["product", "$state", "$firebaseObject", ProductEditCtrl]);

        function ProductEditCtrl(product, $state, $firebaseObject) {
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
                    toastr.error("Form is invalid");
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
