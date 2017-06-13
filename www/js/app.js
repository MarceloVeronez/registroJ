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

  //Temporizador para esperar puxar os itens do mapa para salvar local
  $scope.temporizador = function(){
      setTimeout(function(){ 
        HttpService.insereMapaLocal($scope.mapas); alert("Inserção Local com sucesso");
        console.log($scope.direcaoF); 
      }
      ,3000);
  }
  //Função que ativa o toggle direção
  $scope.direcaoF = true;
  $scope.ativador = function(){
    $scope.direcaoF = false;
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
                    //Puxar hora de inicio
                    var data = new Date();
                    var hora = data.getHours();
                    var minuto = data.getMinutes();
                    var segundo = data.getSeconds();
                    var dia = data.getDate();
                    var mes = data.getMonth()+1;
                    var ano = data.getFullYear();
                    $($scope.mapas.hora = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo);
                    
                    
                }
            }
  //Dados para iniciar os toggles desativados.
  $scope.refeicaoF = true;
  $scope.descansoF = true;
  $scope.cargaF = true;
  $scope.descargaF = true;
  $scope.abastecimentoF = true;
  $scope.tempocF = true;
  $scope.fiscalizacaoF = true;
  $scope.manutencaoF = true;
  $scope.pernoiteF = true;
  $scope.aF = true;
  $scope.buttonF = true;
  //Funções para ativar e desativar os toggles e salvar os horários que foram ativados e desativados em um banco local
  $scope.direcaoFu = function(response, status){
  if($scope.direcao.direcaoC == true){  
    $scope.refeicaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.pernoiteF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.direcao.direcaoC == true){
    $scope.direcao.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.direcao.direcaoC == false){
    $scope.direcao.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereDirecaoLocal($scope.direcao);
  }
  }
$scope.refeicaoFu = function(response, status){
  if($scope.refeicao.refeicaoC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.pernoiteF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.refeicao.refeicaoC == true){
    $scope.refeicao.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.refeicao.refeicaoC == false){
    $scope.refeicao.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereRefeicaoLocal($scope.refeicao);
  }
  }
$scope.descansoFu = function(response, status){
  if($scope.descanso.descansoC == true){  
    $scope.direcaoF = true;
    $scope.refeicaoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.pernoiteF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.descanso.descansoC == true){
    $scope.descanso.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.descanso.descansoC == false){
    $scope.descanso.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereDescansoLocal($scope.descanso);
  }
  }
$scope.cargaFu = function(response, status){
  if($scope.carga.cargaC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.refeicaoF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.pernoiteF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.carga.cargaC == true){
    $scope.carga.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.carga.cargaC == false){
    $scope.carga.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereCargaLocal($scope.carga);
  }
  }
$scope.descargaFu = function(response, status){
  if($scope.descarga.descargaC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.refeicaoF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.pernoiteF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
    $scope.aF = false;
    $scope.buttonF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.descarga.descargaC == true){
    $scope.descarga.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.descarga.descargaC == false){
    $scope.descarga.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereDescargaLocal($scope.descarga);
  }
  }
$scope.abastecimentoFu = function(response, status){
  if($scope.abastecimento.abastecimentoC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.refeicaoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.pernoiteF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.abastecimento.abastecimentoC == true){
    $scope.abastecimento.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.abastecimento.abastecimentoC == false){
    $scope.abastecimento.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereAbastecimentoLocal($scope.abastecimento);
  }
  }
$scope.tempocFu = function(response, status){
  if($scope.tempoc.tempocC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.refeicaoF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.pernoiteF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.tempoc.tempocC == true){
    $scope.tempoc.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else if($scope.tempoc.tempocC == false){
    $scope.tempoc.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereTempocLocal($scope.tempoc);
  }
  }
$scope.fiscalizacaoFu = function(response, status){
  if($scope.fiscalizacao.fiscalizacaoC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.refeicaoF = true;
    $scope.manutencaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.pernoiteF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.fiscalizacao.fiscalizacaoC == true){
    $scope.fiscalizacao.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else{
    $scope.fiscalizacao.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereFiscalizacaoLocal($scope.fiscalizacao);
  }
  }
$scope.manutencaoFu = function(response, status){
  if($scope.manutencao.manutencaoC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.refeicaoF = true;
    $scope.pernoiteF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.refeicaoF = false;
    $scope.pernoiteF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.manutencao.manutencaoC == true){
    $scope.manutencao.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else{
    $scope.manutencao.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.insereManutencaoLocal($scope.manutencao);
  }
  }
$scope.pernoiteFu = function(response, status){
  if($scope.pernoite.pernoiteC == true){  
    $scope.direcaoF = true;
    $scope.descansoF = true;
    $scope.cargaF = true;
    $scope.descargaF = true;
    $scope.abastecimentoF = true;
    $scope.tempocF = true;
    $scope.fiscalizacaoF = true;
    $scope.manutencaoF = true;
    $scope.refeicaoF = true;
  }
  else{
    $scope.direcaoF = false;
    $scope.descansoF = false;
    $scope.cargaF = false;
    $scope.descargaF = false;
    $scope.abastecimentoF = false;
    $scope.tempocF = false;
    $scope.fiscalizacaoF = false;
    $scope.manutencaoF = false;
    $scope.refeicaoF = false;
  }
  var data = new Date();
  var hora = data.getHours();
  var minuto = data.getMinutes();
  var segundo = data.getSeconds();
  var dia = data.getDate();
  var mes = data.getMonth()+1;
  var ano = data.getFullYear();
  if($scope.pernoite.pernoiteC == true){
    $scope.pernoite.inicio = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
  }
  else{
    $scope.pernoite.fim = dia + '/' + mes + '/' + ano + '-' + hora + ':' + minuto + ':' + segundo;
    HttpService.inserePernoiteLocal($scope.pernoite);
  }
  }
  //Aqui acaba as funções dos toggles

  //Função para consultar o mapa e armazenar as mensagens aparecidas na tela de consulta
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
    $scope.itens = [{id: 'direcao', direcao: 'Horários da direção:'},      ];
    $scope.itens2 = [{id: 'refeicao', refeicao: 'Horários da refeição:'}];
    $scope.itens3 = [{id: 'descanso', descanso: 'Horários do descanso:'}]; 
    $scope.itens4 = [{id: 'carga', carga: 'Horários da carga:'}]; 
    $scope.itens5 = [{id: 'descarga', descarga: 'Horários da descarga:'}]; 
    $scope.itens6 = [{id: 'abastecimento', abastecimento: 'Horários do abastecimento:'}]; 
    $scope.itens7 = [{id: 'tempoc', tempoc: 'Horários do tempo cliente:'}]; 
    $scope.itens8 = [{id: 'fiscalizacao', fiscalizacao: 'Horários da fiscalização:'}]; 
    $scope.itens9 = [{id: 'manutencao', manutencao: 'Horários da manutenção:'}]; 
    $scope.itens10 = [{id: 'pernoite', pernoite: 'Horários da pernoite:'}];    
 }           
})

.service('HttpService', function($http) {
    //Funções para salvar os dados locais
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
   //Aqui acaba as funções de inserção local.

   //Funções para retornar os dados locais e ser possivel a consulta
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