angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $window, $ionicSideMenuDelegate, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    /*console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
    $ionicSideMenuDelegate.canDragContent(true);
    $window.location.href = '#/app/reservar';
  };

  $scope.activarReserva = function () {
    //var uris = "http://www.google.com";
    //nfc.handover(uris);

    /*function parseTag(nfcEvent) {
      var records = nfcEvent;

      for (var i = 0; i < records.length; i++) {
        var record = records[i],
        p = document.createElement('p');
        p.innerHTML = nfc.bytesToString(record.payload);
        $("#nfcdata").append(p);
      }
      
       $("#nfcdata").append(JSON.stringify(records));
    };

    nfc.addNdefListener(parseTag);

    var record = ndef.uriRecord("http://www.kazi.net");
    nfc.share(
        [record], 
        function(){ alert ("Successful")},
        function(){ alert ("Failed")}
    );

    alert(record);*/
  };

  $scope.onezoneDatepicker = {
      date: new Date(), // MANDATORY
      mondayFirst: true,
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      daysOfTheWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      //startDate: new Date(1989, 1, 26),
      //endDate: new Date(2024, 1, 26),
      disablePastDays: true,
      disableSwipe: false,
      disableWeekend: false,
      disableDates: [new Date(2016, 7, 2), new Date(2016, 7, 3), new Date(2016, 7, 4)],
      showDatepicker: false,
      showTodayButton: false,
      calendarMode: false,
      hideCancelButton: true,
      hideSetButton: true,
      highlights: []
  };

  $scope.onezoneDatepicker2 = {
      date: new Date(), // MANDATORY
      mondayFirst: true,
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      daysOfTheWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      //startDate: new Date(1989, 1, 26),
      //endDate: new Date(2024, 1, 26),
      disablePastDays: true,
      disableSwipe: false,
      disableWeekend: false,
      disableDates: [new Date(2016, 7, 2), new Date(2016, 7, 3), new Date(2016, 7, 4)],
      showDatepicker: false,
      showTodayButton: false,
      calendarMode: false,
      hideCancelButton: true,
      hideSetButton: true,
      highlights: []
  };
})


.controller('LoginCtrl', function($scope, $ionicSideMenuDelegate) {
  $ionicSideMenuDelegate.canDragContent(false);
})

.controller('ProfileCtrl', function($scope, $ionicSideMenuDelegate) {
  
})

.controller('ActivarCtrl', function($scope, nfcService) {
  $scope.tag = nfcService.tag;
    $scope.clear = function() {
    nfcService.clearTag();
  };
})

.controller('ReservCtrl', function($scope) {
  
})

.controller('ElegirCtrl', function($scope, $ionicPopup) {
   $scope.disponibles = [
    { capacidad: "6", sala: "A-603", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-604", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-605", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-606", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-607", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-608", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-609", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-610", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-611", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" },
    { capacidad: "6", sala: "A-612", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png" }
  ];

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $(".hours-wrapper label").on("click", function () {
      $(".itemSalaHidden").hide();
      $(this).next().show();
    });
  });
  
})

.controller('ReservasCtrl', function($scope, $ionicPopup) {
   $scope.disponibles = [
    { capacidad: "6", sala: "A-603", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png", fecha: "14/11/2016", inicio: "07:00AM", fin:"09:00AM" },
    { capacidad: "6", sala: "A-604", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png", fecha: "14/11/2016", inicio: "07:00AM", fin:"09:00AM" },
    { capacidad: "6", sala: "A-605", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png", fecha: "14/11/2016", inicio: "07:00AM", fin:"09:00AM" },
    { capacidad: "6", sala: "A-612", foto: "img/LCUP-A-603.jpg", ubicacion: "img/LCUP-A-603.png", fecha: "14/11/2016", inicio: "07:00AM", fin:"09:00AM" }
  ];

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $(".hours-wrapper label").on("click", function () {
      $(".itemSalaHidden").hide();
      $(this).next().show();
    });

    $(".hours-wrapper .c-red").on("click", function () {
      $(this).parent().parent().slideUp();
    });
  });
  
})

.controller('HoraCtrl', function($scope) {
  $scope.eventSources = [];

  $scope.uiConfig = {
    calendar:{
      height: 450,
      selectable: true,
      editable: true,
      defaultView: 'agendaWeek',
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      eventClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };
})

.controller('AdminCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
})

.factory('nfcService', function ($rootScope, $ionicPlatform, $nfcServiceProvider) {
  var tag = {};

  $ionicPlatform.ready(function() {
      nfc.addNdefListener(function (nfcEvent) {
          console.log(JSON.stringify(nfcEvent.tag, null, 4));
          $rootScope.$apply(function(){
              angular.copy(nfcEvent.tag, tag);
          });
      }, function () {
          
      }, function (reason) {
          
      });

  });

  return {
      tag: tag,

      clearTag: function () {
          angular.copy({}, this.tag);
      }
  };
});
