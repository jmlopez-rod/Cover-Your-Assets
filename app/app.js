// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(($ionicPlatform) => {
  $ionicPlatform.ready(() => {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var olaf = new Snowman('Olaf');
    olaf.sayHi();

  });
});

class Snowman {
  constructor (name) {
    this.name = name;
  }

  sayHi() {
    console.log("Hi! I'm " + this.name + " and I like warm hugs.");
  }
}

