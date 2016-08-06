angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $window, $ionicSideMenuDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

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

.controller('ActivarCtrl', function($scope) {
  /*var uris = "http://www.google.com";
  nfc.handover(uris);*/

 /*var message = [
    ndef.textRecord("hello, world")
  ];

  nfc.share(message);*/


/*
  function parseTag(nfcEvent) {
    var records = nfcEvent;

      for (var i = 0; i < records.length; i++) {
        var record = records[i],
        p = document.createElement('p');
        p.innerHTML = nfc.bytesToString(record.payload);
        $("#nfcdata").append(p);
      }
      
       $("#nfcdata").append(JSON.stringify(records));
    };

    nfc.addNdefListener(parseTag);*/
  /*function onNfc(nfcEvent) {
    // display the tag as JSON
    $("#nfcdata").append(JSON.stringify(nfcEvent.tag));
  }

  nfc.addNdefListener(onNfc);*/

var SAMPLE_LOYALTY_CARD_AID = 'F222222222';
var SELECT_APDU_HEADER = '00A40400';
var SELECT_OK_SW = '9000';
var UNKNOWN_CMD_SW = '0000';
var SELECT_APDU = buildSelectApdu(SAMPLE_LOYALTY_CARD_AID);

function toPaddedHexString(i) {
    return ("00" + i.toString(16)).substr(-2);
}

function buildSelectApdu(aid) {
    // Format: [CLASS | INSTRUCTION | PARAMETER 1 | PARAMETER 2 | LENGTH | DATA]
    var aidByteLength = toPaddedHexString(aid.length / 2);
    var data = SELECT_APDU_HEADER + aidByteLength + aid;
    return data.toLowerCase();
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        // register to receive APDU commands
      hce.registerCommandCallback(app.onCommand);

        // register to for deactivated callback
        hce.registerDeactivatedCallback(app.onDeactivated);

        app.okCommand = hce.util.hexStringToByteArray(SELECT_OK_SW);
        app.unknownCommand = hce.util.hexStringToByteArray(UNKNOWN_CMD_SW);
    },
    // onCommand is called when an APDU command is received from the HCE reader
    // if the select apdu command is received, the loyalty card data is returned to the reader
    // otherwise unknown command is returned
    onCommand: function(command) {
        console.log(command);
        var commandAsBytes = new Uint8Array(command);
        var commandAsString = hce.util.byteArrayToHexString(commandAsBytes);

        //alert(commandAsString);
        console.log('received command ' + commandAsString);
        console.log('expecting        ' + SELECT_APDU);

        if (SELECT_APDU === commandAsString) {
            var accountNumberAsBytes = hce.util.stringToBytes(accountNumber.value);
            var data = hce.util.concatenateBuffers(accountNumberAsBytes, app.okCommand);

            console.log('Sending ' + hce.util.byteArrayToHexString(data));
            hce.sendResponse(data);
        } else {
            console.log('UNKNOWN CMD SW');
            hce.sendResponse(app.unknownCommand);
        }

    },
    onDeactivated: function(reason) {
        console.log('Deactivated ' + reason);
    }

};

app.initialize();
    
});

