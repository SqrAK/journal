'use strict';

/**
 * Loads all routes.
 */

const logger = require('utils/logger').app,
    routeBuilder = require('utils/route-builder'),
    path = require('path'),
    _ = require('lodash'),
    express = require('express');

function createRoutes(app) {

    //API v1
    const endpoints = [
        {url: '/api/v1/system-info', file: '/api/v1/system-info'},
        {url: '/api/v1/user', file: '/api/v1/user'},
        {url: '/api/v1/security', file: '/api/v1/security'},
        {url: '/api/v1/cats', file: '/api/v1/cats'}
    ];


    _(endpoints)
        .each(endpoint => {
            app.use(endpoint.url, routeBuilder.createRoute(path.join(__dirname, endpoint.file)));
            logger.info('Endpoint added:', endpoint.url);
        });
    app.use( express.static(path.join(__dirname, '../../public')));
}

module.exports = {
    createRoutes: createRoutes
};