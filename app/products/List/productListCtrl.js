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
    angular
        .module("productManagement")
        .controller("ProductListCtrl",
                    ["productResource", ProductListCtrl]);

    function ProductListCtrl(productResource) {
        var vm = this;

        productResource.query(success, failure);

        function success(data) {
            vm.products = data;
            toastr.options = toastrOptions;
            toastr.info('Data Loaded Successfully');
        };

        function failure(data) {
            toastr.options = toastrOptions;
            toastr.error('System Error');
        };

        vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        };
    }
}());
