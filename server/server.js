'use strict';

/**
 * Main module. Setups express app, perform initiation phases and start listening.
 */

require('app-module-path').addPath(__dirname + '/libs');

const server = require('express')(),
    logger = require('utils/logger').app,
    config = require('utils/config'),
    initializers = require('initializers');

async function main() {

    // Execute initializers
    await initializers.sequelize(server);
    await initializers.models(server);
    await initializers.dictionaries(server);
    await initializers.middlewares(server);
    await initializers.routes(server);

    await new Promise((resolve, reject) =>
        server
        .listen(config.get('express:port'), resolve)
        .on('error', reject));

    logger.info('journal application listening on port', config.get('express:port'))
}

main().catch(error => logger.error('Startup error', error));