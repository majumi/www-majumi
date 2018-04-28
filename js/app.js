// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','ngMaterial']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            }
        }
    })


    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            }
        }
    })

    

    .state('app.bebidas', {
        url: '/bebidas',
        views: {
            'menuContent': {
                templateUrl: 'templates/bebidas.html',
                controller: 'bebidasCtrl'
            }
        }
    })

    .state('app.picante', {
        url: '/picante',
        views: {
            'menuContent': {
                templateUrl: 'templates/picante.html',
                controller: 'picanteCtrl'
            }
        }
    })

    .state('app.especiais', {
        url: '/especiais',
        views: {
            'menuContent': {
                templateUrl: 'templates/especiais.html',
                controller: 'especiaisCtrl'
            }
        }
    })

    .state('app.tabacaria', {
        url: '/tabacaria',
        views: {
            'menuContent': {
                templateUrl: 'templates/tabacaria.html',
                controller: 'tabacariaCtrl'
            }
        }

    });







    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
