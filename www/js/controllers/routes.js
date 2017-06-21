angular.module('starter')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('menu',{
      url: '/menu',
      templateUrl: 'templates/menu.html',
      abstract: true
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'userController'
    })

    .state('menu.home',{
      url:'/home',
      views :{
        'menuConteudo' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

.state('menu.jornada',{
      url:'/jornada',
      views :{
        'menuConteudo' : {
          templateUrl: 'templates/jornada.html'
        }
      }
    })

.state('menu.consulta',{
      url:'/consulta',
      views :{
        'menuConteudo' : {
          templateUrl: 'templates/consulta.html'
        }
      }
    })

.state('menu.mapa',{
      url:'/mapa',
      views :{
        'menuConteudo' : {
          templateUrl: 'templates/mapa.html'
        }
      }
    })

.state('menu.mapaNovo',{
      url:'/mapaNovo',
      views :{
        'menuConteudo' : {
          templateUrl: 'templates/mapaNovo.html'
        }
      }
    })


    $urlRouterProvider.otherwise('/login');
  })
