// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'onezone-datepicker', 'nfcFilters', 'ui.calendar', 'starter.controllers'])

.factory('nfcService', function ($rootScope, $ionicPlatform) {
  var tag = {};

  $ionicPlatform.ready(function() {
      nfc.addNdefListener(function (nfcEvent) {
          console.log(JSON.stringify(nfcEvent.tag, null, 4));
          $rootScope.$apply(function(){
              angular.copy(nfcEvent.tag, tag);
              // if necessary $state.go('some-route')
          });
      }, function () {
          console.log("Listening for NDEF Tags.");
      }, function (reason) {
          alert("Error adding NFC Listener " + reason);
      });

  });

  return {
      tag: tag,

      clearTag: function () {
          angular.copy({}, this.tag);
      }
  };
})

.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/auth.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

  }])

  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.resumen', {
    url: '/resumen',
    views: {
      'menuContent': {
        templateUrl: 'templates/resume.html'
      }
    }
  })

  .state('app.reservar', {
    url: '/reservar',
    views: {
      'menuContent': {
        templateUrl: 'templates/reservar.html',
        controller: 'ReservCtrl'
      }
    }
  })

  .state('app.hora', {
    url: '/hora',
    views: {
      'menuContent': {
        templateUrl: 'templates/hora.html',
        controller: 'HoraCtrl'
      }
    }
  })

  .state('app.recurso', {
    url: '/recurso',
    views: {
      'menuContent': {
        templateUrl: 'templates/recurso.html'
      }
    }
  })

  .state('app.elegir', {
    url: '/elegir',
    views: {
      'menuContent': {
        templateUrl: 'templates/elegir.html',
        controller: 'ElegirCtrl'
      }
    }
  })

  .state('app.reservas', {
    url: '/reservas',
    views: {
      'menuContent': {
        templateUrl: 'templates/reservas.html',
        controller: 'ReservasCtrl'
      }
    }
  })

  .state('app.confirmar', {
    url: '/confirmar',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmar.html'
      }
    }
  })

  .state('app.administrar', {
    url: '/administrar',
    views: {
      'menuContent': {
        templateUrl: 'templates/administrar.html',
        controller: 'AdminCtrl'
      }
    }
  })

  .state('app.activar', {
    url: '/activar',
    views: {
      'menuContent': {
        templateUrl: 'templates/activar.html',
        controller: 'ActivarCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
