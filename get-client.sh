#!/usr/bin/env bash
API_ID=$(aws apigateway get-rest-apis --region us-west-2 --query 'items[?name==`Cle API Spec`].id' --output text)
echo "Removing old client"
rm api-client.zip
rm -rf lib
rm -rf apiGateway-js-sdk
echo "Retriving new client from aws REST-API-ID $API_ID"
aws apigateway get-sdk --rest-api-id $API_ID --stage-name stage --region us-west-2 --sdk-type javascript \
  ./api-client.zip
unzip api-client
echo "Moving and flatting client to lib"
mv apiGateway-js-sdk lib
mv lib/lib/* lib
rm -rf lib/lib
