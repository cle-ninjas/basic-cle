/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }


    // extract endpoint and path from url
    var invokeUrl = 'https://8jdf4hu6m1.execute-api.us-west-2.amazonaws.com/stage\n';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);



    apigClient.passportOfferOfferIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['offerId'], ['body']);

        var passportOfferOfferIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/offer/{offerId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['offerId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportOfferOfferIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportOffersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['page'], ['body']);

        var passportOffersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/offers').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['page']),
            body: body
        };


        return apiGatewayClient.makeRequest(passportOffersGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportOffersPromotedGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var passportOffersPromotedGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/offers/promoted').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportOffersPromotedGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportTermsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var passportTermsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/terms').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportTermsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportTransactionTransactionIdStatusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['transactionId'], ['body']);

        var passportTransactionTransactionIdStatusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/transaction/{transactionId}/status').expand(apiGateway.core.utils.parseParametersToObject(params, ['transactionId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportTransactionTransactionIdStatusGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);

        var passportUserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdConsentPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdConsentPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/consent').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdConsentPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdDocumentGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId'], ['body']);

        var passportUserUserIdDocumentGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/document').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdDocumentGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdDocumentPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdDocumentPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/document').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdDocumentPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdDocumentDocumentIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'documentId'], ['body']);

        var passportUserUserIdDocumentDocumentIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/document/{documentId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'documentId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdDocumentDocumentIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdDocumentDocumentIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'documentId', 'body'], ['body']);

        var passportUserUserIdDocumentDocumentIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/document/{documentId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'documentId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdDocumentDocumentIdPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdDocumentDocumentIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'documentId'], ['body']);

        var passportUserUserIdDocumentDocumentIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/document/{documentId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'documentId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdDocumentDocumentIdDeleteRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdOfferApplicationPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdOfferApplicationPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/offer-application').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdOfferApplicationPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdPinPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdPinPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/pin').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdPinPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfileGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId'], ['body']);

        var passportUserUserIdProfileGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfileGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfileBasicPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdProfileBasicPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile/basic').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfileBasicPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfileEmailPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdProfileEmailPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile/email').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfileEmailPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfileEmailPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdProfileEmailPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile/email').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfileEmailPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfilePhonePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdProfilePhonePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile/phone').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfilePhonePutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfilePhonePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'body'], ['body']);

        var passportUserUserIdProfilePhonePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile/phone').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfilePhonePostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.passportUserUserIdProfilePhotoPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['userId'], ['body']);

        var passportUserUserIdProfilePhotoPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/passport/user/{userId}/profile/photo').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(passportUserUserIdProfilePhotoPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.servicesOrganizationOrganizationIdIdentityVerificationPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['organizationId', 'body'], ['body']);

        var servicesOrganizationOrganizationIdIdentityVerificationPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/services/organization/{organizationId}/identity-verification').expand(apiGateway.core.utils.parseParametersToObject(params, ['organizationId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(servicesOrganizationOrganizationIdIdentityVerificationPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.servicesOrganizationOrganizationIdOcrPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['organizationId', 'body'], ['body']);

        var servicesOrganizationOrganizationIdOcrPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/services/organization/{organizationId}/ocr').expand(apiGateway.core.utils.parseParametersToObject(params, ['organizationId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(servicesOrganizationOrganizationIdOcrPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.servicesOrganizationOrganizationIdOcrOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var servicesOrganizationOrganizationIdOcrOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/services/organization/{organizationId}/ocr').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(servicesOrganizationOrganizationIdOcrOptionsRequest, authType, additionalParams, config.apiKey);
    };


    return apigClient;
};
