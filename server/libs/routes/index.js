'use strict';

/**
 * Loads all routes.
 */

const logger = require('utils/logger').app,
    routeBuilder = require('utils/route-builder'),
    path = require('path'),
    _ = require('lodash'),
    express = require('express'),
    models = require('models'), bodyParser = require('body-parser');

function createRoutes(app) {

    //API v1
    const endpoints = [
        {url: '/api/v1/system-info', file: '/api/v1/system-info'},
        {url: '/api/v1/user', file: '/api/v1/user'},
        {url: '/api/v1/security', file: '/api/v1/security'},
        {url: '/api/v1/subject', file: '/api/v1/subject'},
        {url: '/api/v1/role', file: '/api/v1/role'},
        {url: '/api/v1/mark', file: '/api/v1/mark'},
        {url: '/api/v1/lesson', file: '/api/v1/lesson'},
        {url: '/api/v1/class', file: '/api/v1/class'}

    ];


    _(endpoints)
        .each(endpoint => {
            app.use(endpoint.url, routeBuilder.createRoute(path.join(__dirname, endpoint.file)));
            logger.info('Endpoint added:', endpoint.url);
        });

    app.use(express.static(path.join(__dirname, '../../public')));

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
}

module.exports = {
    createRoutes: createRoutes
};