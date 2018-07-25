angular.module('cleApp.identityVerification', ['cleApp.utils'])
  .controller('IdentityVerificationCtrl', function ($scope, $state, $localstorage) {
    $scope.errormessage = "";
    $scope.infomessage = "";
    $scope.verifyButtonDisabled = false;
    $scope.files = {
      frontFileSrc: ""
    };

    $scope.ocrData = {};

    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: BUCKET_NAME
      }
    });


    $scope.upload = function (isValid) {
        $scope.ocrButtonDisabled = true;
  
  
        var frontFile = document.getElementById('frontFile').files[0];
        var selfieFile = document.getElementById('selfieFile').files[0];
        var fullname = document.getElementById('fullname').value;

        var frontFileReader = new FileReader();
        var selfieFileReader = new FileReader();
  
        console.log(frontFile);
        console.log(selfieFile);
        console.log(fullname);

        if (frontFile && selfieFile) {
            console.log('Checking Front');
            frontFileReader.readAsDataURL(frontFile);
        }

        frontFileReader.addEventListener("load", function () {
          console.log('LOAD EVENT');
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
          });
          console.log('Checking Selfie');
          selfieFileReader.readAsDataURL(selfieFile);


          selfieFileReader.addEventListener("load", function () {
            console.log('LOAD EVENT');
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
            });


            var apigClient = apigClientFactory.newClient({
                region: AWS_REGION
              });
    
              var body = {
                "claimedIdentity" : {
                                  "fullName" : "APANCO",
                                  "faceImage" : {
                                    "type" : "IMAGE",
                                    "extension" : "JPG",
                                    "url" : "https://s3.amazonaws.com/id-verifcation-us-east-1-1f0dxeba2d7fe/02510593-F581-415F-A9A9-42E8ABD4FE58/APANCO_SANCHEZ_LILLIAN_JANETT_FRONT.jpg",
                                    "name" : "APANCO_SANCHEZ_LILLIAN_JANETT_SELFIE.jpg",
                                    "mode" : "DOWNLOAD"
                                  },
                                  "hasOrganizationRecord" : true
                                },
                                "document" : {
                                  "category" : "OFFICIAL_ID",
                                  "subcategory" : "INE",
                                  "size" : 1,
                                  "createDate" : "1987-11-03T00:00:00",
                                  "updateDate" : "1987-11-03T00:00:00",
                                  "entries" : [
                                      {
                                        "index" : 0,
                                        "name" : "FRONT",
                                        "file" : {
                                          "type" : "IMAGE",
                                          "extension" : "JPG",
                                          "url" : "https://s3.amazonaws.com/id-verifcation-us-east-1-1f0dxeba2d7fe/02510593-F581-415F-A9A9-42E8ABD4FE58/APANCO_SANCHEZ_LILLIAN_JANETT_FRONT.jpg",
                                          "name" : "APANCO_SANCHEZ_LILLIAN_JANETT_FRONT.jpg",
                                          "mode" : "DOWNLOAD"
                                        }
                                      } 
                                  ]
                                }
                 };

              
              var bodyOCR = {
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
    
              console.log('Processing Verification');
              $scope.infomessage = 'Processing OCR.';
              $scope.$apply();
              console.log('invoking');
              console.log(body);
              console.log('Headers');
              console.log(additionalParams);
              apigClient.servicesOrganizationOrganizationIdIdentityVerificationPost(params, body, additionalParams)
                .then(function (result) {
                  $scope.infomessage = '';
                  console.log("VERIFICATION RESULT", result);
                  $scope.ocrData = result.data;
                  $scope.ocrButtonDisabled = false;
                  $scope.$apply();
                }).catch(function (result) {
                console.error(result);
                $scope.errormessage = "";
                $scope.ocrButtonDisabled = false;
              });

          }, false);
        }, false);
  
  /*
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
  */
        
  
  
      }

    console.log("idOcr controler", $scope, $state)
  });
