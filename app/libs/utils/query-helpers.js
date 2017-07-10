'use strict';

const errors = require('errors'),
    constants = require('utils/config').constants,
    _ = require('lodash');

function createFilters(query, scheme) {
    return _(scheme)
        .keys()
        .intersection(_.keys(query))
        .reduce(
            (filters, key) => {
                switch (scheme[key]) {
                    case "startsWith":
                        filters[key] = {$iLike: `${query[key]}%`}
                        break;
                    case "equals":
                        filters[key] = {$eq: query[key]}
                        break;
                    default:
                        throw new errors.InternalServerError('Incorrect filter operation', scheme[key]);
                }
                return filters;
            },
            {});
}

function createPaging(query) {
    return {
        skip: parseInt(query.skip) || 0,
        limit: parseInt(query.limit) || constants.query.limit
    };
}

module.exports = {
    createFilters: createFilters,
    createPaging: createPaging
};