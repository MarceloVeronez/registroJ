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
  //Funcoes para toggles


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

$scope.inicioJ = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.inicioJ.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.inicioJ.hora);
  HttpService.insereInicioJLocal($scope.inicioJ.hora);
  }
$scope.direcao = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.direcao.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.direcao.hora);
  HttpService.insereDirecaoLocal($scope.direcao.hora);
  }
$scope.refeicao = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.refeicao.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.refeicao.hora);
  HttpService.insereRefeicaoLocal($scope.refeicao.hora);
  }
$scope.descanso = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.descanso.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.descanso.hora);
  HttpService.insereDescansoLocal($scope.descanso.hora);
  }
$scope.carga = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.carga.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.carga.hora);
  HttpService.insereCargaLocal($scope.carga.hora);
  }
$scope.descarga = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.descarga.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.descarga.hora);
  HttpService.insereDescargaLocal($scope.descarga.hora);
  }
$scope.abastecimento = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.abastecimento.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.abastecimento.hora);
  HttpService.insereAbastecimentoLocal($scope.abastecimento.hora);
  }
$scope.tempoc = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.tempoc.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.tempoc.hora);
  HttpService.insereTempocLocal($scope.tempoc.hora);
  }
$scope.fiscalizacao = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.fiscalizacao.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.fiscalizacao.hora);
  HttpService.insereFiscalizacaoLocal($scope.fiscalizacao.hora);
  }
$scope.manutencao = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.manutencao.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.manutencao.hora);
  HttpService.insereManutencaoLocal($scope.manutencao.hora);
  }
$scope.pernoite = function(response, status){
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  $scope.pernoite.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  console.log($scope.pernoite.hora);
  HttpService.inserePernoiteLocal($scope.pernoite.hora);
  }
 $scope.consultaMapas = function(){
    $scope.mapas = JSON.parse(HttpService.getMapasLocal());
    $scope.direcao = JSON.parse(HttpService.getDirecaoLocal());
    $scope.refeicao = JSON.parse(HttpService.getRefeicaoLocal());
    $scope.descanso = JSON.parse(HttpService.getDescansoLocal());
    $scope.carga = JSON.parse(HttpService.getCargaLocal());
    $scope.descarga = JSON.parse(HttpService.getDescargaLocal());
    $scope.abastecimento = JSON.parse(HttpService.getAbastecimentoLocal());
    $scope.tempoc = JSON.parse(HttpService.getTempocLocal());
    $scope.fiscalizacao = JSON.parse(HttpService.getFiscalizacaoLocal());
    $scope.manutencao = JSON.parse(HttpService.getManutencaoLocal());
    $scope.pernoite = JSON.parse(HttpService.getPernoiteLocal());
    $scope.itens = [{id: 'direcao', direcao: 'Horários da direção (ínicio e fim respectivamente)'},      ];
    $scope.itens2 = [{id: 'refeicao', refeicao: 'Horários da refeição (ínicio e fim respectivamente)'}];
    $scope.itens3 = [{id: 'descanso', descanso: 'Horários do descanso (ínicio e fim respectivamente)'}]; 
    $scope.itens4 = [{id: 'carga', carga: 'Horários da carga (ínicio e fim respectivamente)'}]; 
    $scope.itens5 = [{id: 'descarga', descarga: 'Horários da descarga (ínicio e fim respectivamente)'}]; 
    $scope.itens6 = [{id: 'abastecimento', abastecimento: 'Horários do abastecimento (ínicio e fim respectivamente)'}]; 
    $scope.itens7 = [{id: 'tempoc', tempoc: 'Horários do tempo cliente (ínicio e fim respectivamente)'}]; 
    $scope.itens8 = [{id: 'fiscalizacao', fiscalizacao: 'Horários da fiscalização (ínicio e fim respectivamente)'}]; 
    $scope.itens9 = [{id: 'manutencao', manutencao: 'Horários da manutenção (ínicio e fim respectivamente)'}]; 
    $scope.itens10 = [{id: 'pernoite', pernoite: 'Horários da pernoite (ínicio e fim respectivamente)'}];    
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

    insereInicioJLocal: function(novo) { 
      // guarda os mapas
      var inicioJ = [ ];
      // verifica se a chave existe
      if (typeof localStorage.inicioJ != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          inicioJ = JSON.parse(localStorage.Inicio);
      }
      // adiciona produto novo no vetor
     inicioJ.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(inicioJ);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('inicioJ', paraString);
      return novo;
   },
    insereDirecaoLocal: function(novo) { 
      // guarda os mapas
      var direcao = [ ];
      // verifica se a chave existe
      if (typeof localStorage.direcao != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          direcao = JSON.parse(localStorage.direcao);
      }
      // adiciona produto novo no vetor
     direcao.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(direcao);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('direcao', paraString);
      return novo;
   },

   insereRefeicaoLocal: function(novo) { 
      // guarda os mapas
      var refeicao = [ ];
      // verifica se a chave existe
      if (typeof localStorage.refeicao != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          refeicao = JSON.parse(localStorage.refeicao);
      }
      // adiciona produto novo no vetor
     refeicao.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(refeicao);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('refeicao', paraString);
      return novo;
   },

   insereDescansoLocal: function(novo) { 
      // guarda os mapas
      var descanso = [ ];
      // verifica se a chave existe
      if (typeof localStorage.descanso != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          descanso = JSON.parse(localStorage.descanso);
      }
      // adiciona produto novo no vetor
     descanso.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(descanso);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('descanso', paraString);
      return novo;
   },

   insereCargaLocal: function(novo) { 
      // guarda os mapas
      var carga = [ ];
      // verifica se a chave existe
      if (typeof localStorage.carga != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          carga = JSON.parse(localStorage.carga);
      }
      // adiciona produto novo no vetor
     carga.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(carga);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('carga', paraString);
      return novo;
   },

   insereDescargaLocal: function(novo) { 
      // guarda os mapas
      var descarga = [ ];
      // verifica se a chave existe
      if (typeof localStorage.descarga != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          descarga = JSON.parse(localStorage.descarga);
      }
      // adiciona produto novo no vetor
     descarga.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(descarga);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('descarga', paraString);
      return novo;
   },

   insereAbastecimentoLocal: function(novo) { 
      // guarda os mapas
      var abastecimento = [ ];
      // verifica se a chave existe
      if (typeof localStorage.abastecimento != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          abastecimento = JSON.parse(localStorage.abastecimento);
      }
      // adiciona produto novo no vetor
     abastecimento.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(abastecimento);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('abastecimento', paraString);
      return novo;
   },

   insereTempocLocal: function(novo) { 
      // guarda os mapas
      var tempoc = [ ];
      // verifica se a chave existe
      if (typeof localStorage.tempoc != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          tempoc = JSON.parse(localStorage.tempoc);
      }
      // adiciona produto novo no vetor
     tempoc.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(tempoc);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('tempoc', paraString);
      return novo;
   },

   insereFiscalizacaoLocal: function(novo) { 
      // guarda os mapas
      var fiscalizacao = [ ];
      // verifica se a chave existe
      if (typeof localStorage.fiscalizacao != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          fiscalizacao = JSON.parse(localStorage.fiscalizacao);
      }
      // adiciona produto novo no vetor
     fiscalizacao.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(fiscalizacao);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('fiscalizacao', paraString);
      return novo;
   },

   insereManutencaoLocal: function(novo) { 
      // guarda os mapas
      var manutencao = [ ];
      // verifica se a chave existe
      if (typeof localStorage.manutencao != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          manutencao = JSON.parse(localStorage.manutencao);
      }
      // adiciona produto novo no vetor
     manutencao.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(manutencao);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('manutencao', paraString);
      return novo;
   },

   inserePernoiteLocal: function(novo) { 
      // guarda os mapas
      var pernoite = [ ];
      // verifica se a chave existe
      if (typeof localStorage.pernoite != 'undefined'){
          // recupera conteúdo da chave e transforma em JSON
          pernoite = JSON.parse(localStorage.pernoite);
      }
      // adiciona produto novo no vetor
     pernoite.push(novo);
     // converte JSON para String
      var paraString = JSON.stringify(pernoite);
      // armazena conteúdo do vetor em localStorate
      localStorage.setItem('pernoite', paraString);
      return novo;
   },
   getMapasLocal: function() {
     // retorna conteúdo da chave mapas  
     return localStorage.mapas;
   },
   getDirecaoLocal: function() {
    console.log(localStorage.direcao);
     return localStorage.direcao;
   },
   getRefeicaoLocal: function() {
    console.log(localStorage.refeicao);
     return localStorage.refeicao;
   },
   getDescansoLocal: function() {
    console.log(localStorage.descanso);
     return localStorage.descanso;
   },
   getCargaLocal: function() {
    console.log(localStorage.carga);
     return localStorage.carga;
   },
   getDescargaLocal: function() {
    console.log(localStorage.descarga);
     return localStorage.descarga;
   },
   getAbastecimentoLocal: function() {
    console.log(localStorage.abastecimento);
     return localStorage.abastecimento;
   },
   getTempocLocal: function() {
    console.log(localStorage.tempoc);
     return localStorage.tempoc;
   },
   getFiscalizacaoLocal: function() {
    console.log(localStorage.fiscalizacao);
     return localStorage.fiscalizacao;
   },
   getManutencaoLocal: function() {
    console.log(localStorage.manutencao);
     return localStorage.manutencao;
   },
   getPernoiteLocal: function() {
    console.log(localStorage.pernoite);
     return localStorage.pernoite;
   }
  }
  });