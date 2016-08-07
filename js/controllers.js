angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $window, $ionicSideMenuDelegate) {

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
    $window.location.href = '#/app/perfil';
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
      showDatepicker: true,
      showTodayButton: false,
      calendarMode: true,
      hideCancelButton: true,
      hideSetButton: true,
      highlights: [],
      callback: function(value){
          // your code
      }
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

.controller('ReservCtrl', function($scope, soapService) {
  soapService.HelloWorld().then(function(response){
    $scope.response = response;
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

.factory("soapService", ['$soap',function($soap){
    var base_url = "http://localhost:3034/ReservaService.svc?wsdl";

    return {
        HelloWorld: function(){
            return $soap.post(base_url,"HelloWorld");
        }
    }
}])

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
