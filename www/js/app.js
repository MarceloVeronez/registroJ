// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope, HttpService) {

  $scope.temporizador = function(){
     setTimeout(function() { HttpService.insereMapaLocal($scope.mapas); alert("Inserção Local com sucesso"); }, 3000);
  }

 //Inicio da distancia do mapa
 $scope.CalculaDistancia = function(){

    console.log("chegou aqui " + $scope.mapas.txtOrigem);

     $('#litResultado').html('Aguarde...');
                //Instanciar o DistanceMatrixService
                var service = new google.maps.DistanceMatrixService();
                //executar o DistanceMatrixService
                service.getDistanceMatrix(
                  {
                      //Origem
                      origins: [$scope.mapas.txtOrigem],
                      //Destino
                      destinations: [$scope.mapas.txtDestino],
                      //Modo (DRIVING | WALKING | BICYCLING)
                      travelMode: google.maps.TravelMode.DRIVING,
                      //Sistema de medida (METRIC | IMPERIAL)
                      unitSystem: google.maps.UnitSystem.METRIC
                      //Vai chamar o callback
                  }, callback);

  }
            //Tratar o retorno do DistanceMatrixService
            function callback(response, status) {

               console.log(" aqui tb");
                //Verificar o Status
                if (status != google.maps.DistanceMatrixStatus.OK)
                    //Se o status não for "OK"
                    $('#litResultado').html(status);
                else {
                    //Se o status for OK
                    //Endereço de origem = response.originAddresses
                    //Endereço de destino = response.destinationAddresses
                    //Distância = response.rows[0].elements[0].distance.text
                    //Duração = response.rows[0].elements[0].duration.text
                    $('#litResultado').html("<strong>Origem</strong>: " + response.originAddresses +
                        "<br /><strong>Destino:</strong> " + response.destinationAddresses +
                        "<br /><strong>Distância</strong>: " + response.rows[0].elements[0].distance.text +
                        " <br /><strong>Duração</strong>: " + response.rows[0].elements[0].duration.text
                        );
                    //Salvar dados de distancia e tempo em variaveis
                    $($scope.mapas.distancia = response.rows[0].elements[0].distance.text);
                    $($scope.mapas.tempo = response.rows[0].elements[0].duration.text);
                    //Atualizar o mapa
                    $("#map").attr("src", "https://maps.google.com/maps?saddr=" + response.originAddresses + "&daddr=" + response.destinationAddresses + "&output=embed");
                }
            }

})

.service('HttpService', function($http) {
  return{
    insereMapaLocal: function(novo) { 
      // guarda os mapas
      var mapas = [ ];
      // verifica se a chave existe
      if (typeof localStorage.mapas != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          mapas = JSON.parse(localStorage.mapas);
      }
      // adiciona produto novo no vetor
     mapas.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(mapas);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('mapas', paraString);
      
      return novo;
   
   },
  }
});