'use strict';

const models = require("models"),
    HTTPStatus = require('http-status'),
    queryHelpers = require('utils/query-helpers'),
    objectValidator = require('utils/object-validator'),
    errors = require('errors'),
    sequelize = require('utils/sequelize'),
    _ = require('utils/lodash-ext');

/**
 * GET /api/v1/cats
 * @param req req
 * @param res res
 */

async function list(req, res) {
    //@f:off
    objectValidator.createValidator(req.query)
        .field('name')
            .optional()
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Name')}), {min: 1, max: 255})
        .field('bossName')
            .optional()
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Boss name')}), {min: 1, max: 255})
        .validate();
    //@f:on

    let pagingFilter = queryHelpers.createPaging(req.query),
        entitiesFilter = queryHelpers.createFilters(req.query, {
            name: 'startsWith',
            bossName: 'startsWith'
        }),
        sortCondition = [[req.query.sort || 'name', req.query.direction ? req.query.direction.toUpperCase() : 'ASC']];

    let cats = await sequelize.transaction(async t => {
                // chain all your queries here. make sure you return them.
                return await models.Cat.findAndCountAll({
                    where: entitiesFilter,
                    order: sortCondition,
                    offset: pagingFilter.skip,
                    limit: pagingFilter.limit,
                    transaction: t
                });
            }
        );

    res.json({
        offset: pagingFilter.skip,
        limit: pagingFilter.limit,
        count: cats.rows.length,
        totalCount: cats.count,
        cats: _.pickArrayExt(cats.rows, ['name', 'bossName', 'birthDate', 'id'])
    });
}

/**
 * GET /api/v1/cats/:id
 * @param req req
 * @param res res
 */

async function get(req, res) {
    let cat = await sequelize.transaction(async t => {
                // chain all your queries here. make sure you return them.
                return await models.Cat.find({
                    where: {
                        id : req.params.id
                    },
                    transaction: t
                });
            }
        );

    if (!cat) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Cat')}), req.params.id);
    }

    res.json({
        cat: _.pickExt(cat, ['name', 'bossName', 'birthDate', 'id'])
    });
}

/**
 * POST /api/v1/cats
 * @param req req
 * @param res res
 */

async function create(req, res) {
    //@f:off
    objectValidator.createValidator(req.body)
        .field('name')
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Name')}), {min: 1, max: 255})
        .field('bossName')
            .optional()
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Boss name')}), {min: 1, max: 255})
        .field('birthDate')
            .optional()
            .isDate(req.__mf('Invalid date.'))
        .validate();
    //@f:on

    //It was made in order to not create empty fields in database
    _.removeEmptyFieldsExt(req.body, 'bossName birthDate', undefined);

    let newCat = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Cat.create(req.body, {transaction: t});
        }
    );

    res.json({
        id: newCat.id
    });
}

/**
 * PUT /api/v1/cats/:id
 * @param req req
 * @param res res
 */

async function update(req, res) {
    //@f:off
    objectValidator.createValidator(req.body, {allowUndefined: true})
        .field('name')
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Name')}), {min: 1, max: 255})
        .field('bossName')
            .optional()
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Boss name')}), {min: 1, max: 255})
        .field('birthDate')
            .optional()
            .isDate(req.__mf('Invalid date.'))
        .validate();
    //@f:on

    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let cat = await models.Cat.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });

            if (!cat) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Cat')}), req.params.id);
            }

            //it was made in order to delete empty fields from database
            _.removeEmptyFieldsExt(req.body, 'bossName birthDate', null);

            _.assign(cat, req.body);

            await cat.save({transaction: t});
        }
    );

    res.status(HTTPStatus.NO_CONTENT).send();
}

/**
 * DELETE /api/v1/cats/:id
 * @param req req
 * @param res res
 */

async function remove(req, res) {
    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let cat = await models.Cat.find({
                where: {
                    id: req.params.id
                },
                transaction: t
            });

            if (!cat) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Cat')}), req.params.id);
            }

            await cat.destroy({transaction: t});
        }
    );

    res.status(HTTPStatus.NO_CONTENT).send();
}

module.exports = {
    list: list,
    get: get,
    create: create,
    update: update,
    remove: remove
};