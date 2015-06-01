(
    function () {
        "use strict";

        var app = angular
            .module("productResourceMock",
            ["ngMockE2E"]);

        app.run(function ($httpBackend){
            var products = [
                {
                    "productId": 1,
                    "productName": "Leaf Rake",
                    "productCode": "FGH-111",
                    "releaseDate": "March 19, 2009",
                    "description": "Leaf rake with wooden handle",
                    "cost": 9.00,
                    "price": 19.95,
                    "category": "garden",
                    "tags": ["leaf", "tool"],
                    "imageUrl": "https://openclipart.org/image/300px/svg_to_png/219823/Chocolateicecreamforopenclipart.png"
                },
                {
                    "productId": 2,
                    "productName": "Ice Cream",
                    "productCode": "FGH-2323",
                    "releaseDate": "March 19, 2006",
                    "description": "Ice cream",
                    "cost": 19.00,
                    "price": 119.95,
                    "category": "fridge",
                    "tags": ["leaf", "tool"],
                    "imageUrl": "https://openclipart.org/image/300px/svg_to_png/219820/ice-for-openclipart.png"
                },
                {
                    "productId": 3,
                    "productName": "Goat",
                    "productCode": "FGsH-11sd1",
                    "releaseDate": "April 19, 2009",
                    "description": "goat",
                    "cost": 9.00,
                    "price": 19.95,
                    "category": "garden",
                    "tags": ["goat", "tool"],
                    "imageUrl": "https://openclipart.org/image/300px/svg_to_png/219819/Ziege-coloured.png"
                },
                {
                    "productId": 4,
                    "productName": "Random",
                    "productCode": "FGrH-111rr",
                    "releaseDate": "March 19, 2019",
                    "description": "Bla ",
                    "cost": 91.00,
                    "price": 191.95,
                    "category": "garden",
                    "tags": ["leaf", "tool"],
                    "imageUrl": "https://openclipart.org/image/300px/svg_to_png/219824/Ural-4320-by-Rones.png"
                }
            ];

            var productUrl = "/api/products";

            $httpBackend.whenGET(productUrl).respond(products);

            var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
            $httpBackend.whenGET(productUrl + "/2").respond(function(method, url, data) {
                var product = {"productId": 0};
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length - 1];

                if (id > 0) {
                    for (var i=0; i<products.length; i++) {
                        if (products[i].productId == id) {
                            product = products[i];
                            break;
                        }
                    };
                }
                return [200, product, {}];
            });

            $httpBackend.whenPOST(productUrl).respond(function(method, url, data){
                var product = angular.fromJson(data);
                if (!product.productId) {
                    product.productId = products[products.length - 1].productId + 1;
                    products.push(product);
                }
                else {
                    for (var i=0; i< products.length; i++) {
                        if (products[i].productId == product.productId) {
                            products[i] = product;
                            break;
                        }
                    };
                }
                return [200, product, {}];
            });

            $httpBackend.whenGET(/app/).passThrough();

        })

    }()
);
