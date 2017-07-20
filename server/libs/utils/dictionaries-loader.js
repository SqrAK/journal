'use strict';

const logger = require('utils/logger').utils,
    models = require('models'),
    dictionaries = require('dictionaries'),
    _ = require('lodash');

/**
 * Load dictionaries to database
 */
async function loadDictionaries() {
    //make load
    await _loadDictionary(dictionaries["subjects"]);
    await _loadDictionary(dictionaries["classes"]);
    await _loadDictionary(dictionaries["roles"]);
    await _loadDictionary(dictionaries["users"]);
    await _loadDictionary(dictionaries["lessons"]);
    await _loadDictionary(dictionaries["marks"]);


    // for (let dictionary in dictionaries) {
    //     console.log("1111111111111111111111111111111111111111111");
    //     console.log(dictionaries[dictionary]);
    //     console.log(dictionary);
    //     await _loadDictionary(dictionaries[dictionary]);
    //
    // }
}

async function _loadDictionary(dictionary) {
    logger.debug('dictionaries-loader._loadDictionary', dictionary.model);

    await models[dictionary.model].sync();

    if (!(await models[dictionary.model].count())) {
        logger.debug('dictionaries-loader._loadDictionary -> creation', dictionary.model);
        await models[dictionary.model].bulkCreate(dictionary.entities, {individualHooks: true});
    }



    logger.debug('dictionaries-loader._loadDictionary -> done', dictionary.model);
}

module.exports = {
    loadDictionaries: loadDictionaries
};