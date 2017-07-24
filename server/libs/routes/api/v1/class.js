'use strict';

const models = require("models"),
    HTTPStatus = require('http-status'),
    queryHelpers = require('utils/query-helpers'),
    objectValidator = require('utils/object-validator'),
    errors = require('errors'),
    sequelize = require('utils/sequelize'),
    _ = require('utils/lodash-ext');

/**
 * GET /api/v1/class
 * @param req req
 * @param res res
 */

async function list(req, res) {
    //@f:off
    objectValidator.createValidator(req.query)
        .field('number')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Class_id')}), {min: 1, max: 255})
        .isInteger(req.__mf('Please provide valid value.'))
        .field('subject_id')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Teacher_id')}), {min: 1, max: 255})
        .isInteger(req.__mf('Please provide valid value.'))
        .validate();
    //@f:on

    let pagingFilter = queryHelpers.createPaging(req.query),
        entitiesFilter = queryHelpers.createFilters(req.query, {
            class_id: 'startsWith'
        }),
        sortCondition = [[req.query.sort || 'number', req.query.direction ? req.query.direction.toUpperCase() : 'ASC']];

    let classes = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Class.findAndCountAll({
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
        count: classes.rows.length,
        totalCount: classes.count,
        classes: _.pickArrayExt(classes.rows, ['number', 'subject_id', 'id'])
    });
}

/**
 * GET /api/v1/class/:id
 * @param req req
 * @param res res
 */

async function get(req, res) {
    let classes = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Class.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });
        }
    );

    if (!classes) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Class')}), req.params.id);
    }

    res.json({
        classes: _.pickExt(classes,['number', 'subject_id', 'id'])
    });
}

/**
 * POST /api/v1/class
 * @param req req
 * @param res res
 */

async function create(req, res) {
    //@f:off
    objectValidator.createValidator(req.body)
        .field('number')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .isInteger(req.__mf('Please provide valid value.'))
        .field('subject_id')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .isInteger(req.__mf('Please provide valid value.'))

        .validate();
    //@f:on

    //It was made in order to not create empty fields in database
    _.removeEmptyFieldsExt(req.body, ' ', undefined);

    let newClass = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Class.create(req.body, {transaction: t});
        }
    );

    res.json({
        id: newClass.id
    });
}

/**
 * PUT /api/v1/class/:id
 * @param req req
 * @param res res
 */

async function update(req, res) {
    //@f:off
    objectValidator.createValidator(req.body, {allowUndefined: true})
        .field('number')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .isInteger(req.__mf('Invalid value.'))
        .field('subject_id')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .isInteger(req.__mf('Invalid value.'))
        .validate();
    //@f:on

    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let classes = await models.Classes.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });

            if (!classes) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Class')}), req.params.id);
            }

            //it was made in order to delete empty fields from database
            _.removeEmptyFieldsExt(req.body, '', null);

            _.assign(classes, req.body);

            await classes.save({transaction: t});
        }
    );

    res.status(HTTPStatus.NO_CONTENT).send();
}

/**
 * DELETE /api/v1/class/:id
 * @param req req
 * @param res res
 */

async function remove(req, res) {
    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let classes = await models.Class.find({
                where: {
                    id: req.params.id
                },
                transaction: t
            });

            if (!classes) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Class')}), req.params.id);
            }

            await classes.destroy({transaction: t});
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