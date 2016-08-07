// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'onezone-datepicker', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.filter('bytesToHexString', function() {
    return function (input) {
        if (window.nfc) {
            return nfc.bytesToHexString(input);
        } else {
            return input;
        }
    }
})

.filter('bytesToString', function() {
    return function(input) {
        if (window.nfc) {
            return nfc.bytesToString(input);
        } else {
            return input;
        }
    };
})

.filter('tnfToString', function() {

    function tnfToString(tnf) {
        var value = tnf;

        switch (tnf) {
            case ndef.TNF_EMPTY:
                value = "Empty";
                break;
            case ndef.TNF_WELL_KNOWN:
                value = "Well Known";
                break;
            case ndef.TNF_MIME_MEDIA:
                value = "Mime Media";
                break;
            case ndef.TNF_ABSOLUTE_URI:
                value = "Absolute URI";
                break;
            case ndef.TNF_EXTERNAL_TYPE:
                value = "External";
                break;
            case ndef.TNF_UNKNOWN:
                value = "Unknown";
                break;
            case ndef.TNF_UNCHANGED:
                value = "Unchanged";
                break;
            case ndef.TNF_RESERVED:
                value = "Reserved";
                break;
        }
        return value;
    }

    return function(input) {

        if (window.ndef) {
            return tnfToString(input);
        } else {
            return input;
        }

    };
})

.filter('decodePayload', function() {

    function decodePayload(record) {

        var payload,
            recordType = nfc.bytesToString(record.type);

        if (recordType === "T") {
            payload = ndef.textHelper.decodePayload(record.payload);

        } else if (recordType === "U") {
            payload = ndef.uriHelper.decodePayload(record.payload);

        } else {

            // we don't know how to translate this type, try and print it out.
            // your app should know how to process tags it receives

            var printableData = record.payload.map(function(i) {
                if (i <= 0x1F) {
                    return 0x2e; // unprintable, replace with "."
                } else {
                    return i;
                }
            });

            payload = nfc.bytesToString(printableData);
        }

        return payload;
    }

    return function(input) {

        if (window.nfc) {
            return decodePayload(input);
        } else {
            return input.payload;
        }

    };
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
        templateUrl: 'templates/reservar.html'
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
