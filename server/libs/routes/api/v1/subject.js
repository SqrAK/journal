'use strict';

const models = require("models"),
    HTTPStatus = require('http-status'),
    queryHelpers = require('utils/query-helpers'),
    objectValidator = require('utils/object-validator'),
    errors = require('errors'),
    sequelize = require('utils/sequelize'),
    _ = require('utils/lodash-ext');

/**
 * GET /api/v1/subject
 * @param req req
 * @param res res
 */

async function list(req, res) {
    //@f:off
    objectValidator.createValidator(req.query)
        .field('name')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Name')}), {min: 1, max: 255})
        .validate();
    //@f:on

    let pagingFilter = queryHelpers.createPaging(req.query),
        entitiesFilter = queryHelpers.createFilters(req.query, {
             name: 'startsWith'
        }),
        sortCondition = [[req.query.sort || 'name', req.query.direction ? req.query.direction.toUpperCase() : 'ASC']];

    let subjects = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Subject.findAndCountAll({
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
        count: subjects.rows.length,
        totalCount: subjects.count,
        subject: _.pickArrayExt(subjects.rows, ['name', 'id'])
    });
}

/**
 * GET /api/v1/subject/:id
 * @param req req
 * @param res res
 */

async function get(req, res) {
    let subject = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Subject.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });
        }
    );

    if (!subject) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Subject')}), req.params.id);
    }

    res.json({
        subject: _.pickExt(subject, ['name', 'id'])
    });
}

/**
 * POST /api/v1/subject
 * @param req req
 * @param res res
 */

async function create(req, res) {
    //@f:off
    objectValidator.createValidator(req.body)
        .field('name')
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Name')}), {min: 1, max: 255})
        .validate();
    //@f:on

    //It was made in order to not create empty fields in database
    _.removeEmptyFieldsExt(req.body, '', undefined);

    let newSubject = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Subject.create(req.body, {transaction: t});
        }
    );

    res.json({
        id: newSubject.id
    });
}

/**
 * PUT /api/v1/subject/:id
 * @param req req
 * @param res res
 */

async function update(req, res) {
    //@f:off
    objectValidator.createValidator(req.body, {allowUndefined: true})
        .field('name')
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Name')}), {min: 1, max: 255})
        .validate();
    //@f:on

    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let subject = await models.Subject.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });

            if (!subject) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Subject')}), req.params.id);
            }

            //it was made in order to delete empty fields from database
            _.removeEmptyFieldsExt(req.body, '', null);

            _.assign(subject, req.body);

            await subject.save({transaction: t});
        }
    );

    res.status(HTTPStatus.NO_CONTENT).send();
}

/**
 * DELETE /api/v1/subject/:id
 * @param req req
 * @param res res
 */

async function remove(req, res) {
    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let subject = await models.Subject.find({
                where: {
                    id: req.params.id
                },
                transaction: t
            });

            if (!subject) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Subject')}), req.params.id);
            }

            await subject.destroy({transaction: t});
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