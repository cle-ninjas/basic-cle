angular.module('cleApp.idOcr', ['cleApp.utils'])
  .controller('IdOcrCtrl', function ($scope, $state, $localstorage) {


    if (AWS.config.credentials.params.Logins === undefined) {
      $state.go('signin', {});
    }
    $scope.errormessage = "";

    $scope.ocrButtonDisabled = false;


    $scope.infomessage = "",

      $scope.files = {
        frontFileSrc: ""
      };

    $scope.ocrData = {};

    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: BUCKET_NAME}
    });

    console.log("idOcr controler", $scope, $state)

    $scope.upload = function (isValid) {

      $scope.ocrButtonDisabled = true;


      var frontFile = document.getElementById('frontFile').files[0];
      var frontFileReader = new FileReader();

      console.log(frontFile);

      frontFileReader.addEventListener("load", function () {


        $scope.files.frontFileSrc = frontFileReader.result;
        $scope.infomessage = 'Uploading .';
        $scope.$apply();


        var s3Key = "02510593-F581-415F-A9A9-42E8ABD4FE58/" + frontFile.name;

        s3.upload({
          Key: s3Key,
          Body: frontFile,
          ACL: 'private'
        }, function (err, data) {
          if (err) {
            $scope.errormessage = 'There was an error uploading .';
            console.error('There was an error uploading : ', err.message);
            $scope.ocrButtonDisabled = false;
            $scope.$apply();
            return;
          }


          $scope.infomessage = 'Successfully uploaded.';
          $scope.$apply();
          console.info('Successfully uploaded.');

          var apigClient = apigClientFactory.newClient({
            region: AWS_REGION // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
            // accessKey: AWS.config.credentials.accessKeyId,
            // secretKey: AWS.config.credentials.secretAccessKey,
            // sessionToken: AWS.config.credentials.sessionToken
          });

          var body = {
            category: 'OFFICIAL_ID',
            subcategory: 'INE',
            size: '1',
            entries: [{
              name: "what?",
              index: 0,
              file: {
                type: 'image',
                name: frontFile.name,
                mode: 'download'
              }
            }]

          };

          var params = {
            organizationId: ORGANIZATION_ID
          };

          var additionalParams = {
            headers: {
              Authenticate: AWS.config.credentials.params.Logins[LOGIN_STRING]
            }
          };

          $scope.infomessage = 'Processing OCR.';
          $scope.$apply();
          apigClient.servicesOrganizationOrganizationIdOcrPost(params, body, additionalParams)
            .then(function (result) {
              $scope.infomessage = '';
              console.log("OCR RESULT", result);
              $scope.ocrData = result.data;
              $scope.ocrButtonDisabled = false;
              $scope.$apply();
            }).catch(function (result) {
            console.error(result);
            $scope.errormessage = "";
            $scope.ocrButtonDisabled = false;
          });


        });


      }, false);


      if (frontFile) {
        frontFileReader.readAsDataURL(frontFile);
      }


    }

  });
