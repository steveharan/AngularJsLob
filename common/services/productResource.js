(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource",["$resource",productResource]);

    function productResource($resource) {
        return $resource('https://steveharan.firebaseio.com/products:id.json');
//        return $resource("/api/products/:productId")
    }
}());