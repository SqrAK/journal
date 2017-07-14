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
        {url: '/api/v1/cats', file: '/api/v1/cats'}
    ];


    _(endpoints)
        .each(endpoint => {
            app.use(endpoint.url, routeBuilder.createRoute(path.join(__dirname, endpoint.file)));
            logger.info('Endpoint added:', endpoint.url);
        });

    app.use(express.static(path.join(__dirname, '../../public')));

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.post('/authenticate', function (req, res) {

        // find the user
        User.findOne({
            name: req.body.name
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });


    app.post('/marks', function (req, res) {
        models.Mark.findAll({
            // include: [
            //     {
            //         model: models.User,
            //         include: [{
            //             model: models.Role,
            //             where: {name: "Ученик"}
            //         }]
            //
            //     },
            //     {
            //         model: models.Subject,
            //         where: { name: req.body.name }
            //     }
            // ]
        }).then(function (subj) {
                res.json(subj);
            });
    });

    app.get('/subjects', function (req, res) {

        models.Subject.findAll({}).then(function (subj) {
            res.json(subj);
        });
    });

    app.get('/students', function (req, res) {
        models.User.findAll({
            include: [{
                model: models.Role,
                where: {name: "Ученик"}
            }]
        }).then(function (subj) {
            res.json(subj);
        });
    });
}

module.exports = {
    createRoutes: createRoutes
};