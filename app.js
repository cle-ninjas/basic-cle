var app = angular.module("cleApp",
  ['ui.router',
    'ngResource',
    'ngMessages',
    'cleApp.signin',
    'cleApp.signup',
    'cleApp.confirm',
    'cleApp.idOcr',
    'cleApp.identityVerification']
);

app.config(function ($stateProvider, $urlRouterProvider) {

  AWSCognito.config.region = COGNITO_REGION;
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
  });
  AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

  var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
  });
  AWS.config.region = COGNITO_REGION;
  AWS.config.credentials = creds;

  $stateProvider

    .state('signin', {
      url: '/signin',
      views: {
        '': {
          templateUrl: 'modules/signin/signin.html',
          controller: 'SigninCtrl'
        }
      }
    })

    .state('signup', {
      url: '/signup',
      views: {
        '': {
          templateUrl: 'modules/signup/signup.html',
          controller: 'SignupCtrl'
        }
      }
    })

    .state('confirm', {
      url: '/confirm',
      views: {
        '': {
          templateUrl: 'modules/confirm/confirm.html',
          controller: 'ConfirmCtrl'
        }
      }
    })

    .state('idOcr', {
      url: '/id-ocr',
      views: {
        '': {
          templateUrl: 'modules/id-ocr/id-ocr.html',
          controller: 'IdOcrCtrl'
        }
      }
    })

    .state('identityVerification', {
      url: '/identity-verification',
      views: {
        '': {
          templateUrl: 'modules/identity-verification/identity-verification.html',
          controller: 'IdentityVerificationCtrl'
        }
      }
    })


  $urlRouterProvider.otherwise('/signin');

});


var compareTo = function () {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function (scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
    }
  };
};

app.directive("compareTo", compareTo);
