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

    $urlRouterProvider.otherwise('/login');
  })
