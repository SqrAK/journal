'use strict';

const models = require("models"),
    HTTPStatus = require('http-status'),
    queryHelpers = require('utils/query-helpers'),
    objectValidator = require('utils/object-validator'),
    errors = require('errors'),
    sequelize = require('utils/sequelize'),
    _ = require('utils/lodash-ext');

/**
 * GET /api/v1/mark
 * @param req req
 * @param res res
 */

async function list(req, res) {
    //@f:off
    objectValidator.createValidator(req.query)
        .field('value')
        .optional()
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .isInteger(req.__mf('Please provide valid value.'))
        .validate();
    //@f:on

    let pagingFilter = queryHelpers.createPaging(req.query),
        entitiesFilter = queryHelpers.createFilters(req.query, {
            value: 'startsWith'
        }),
        sortCondition = [[req.query.sort || 'value', req.query.direction ? req.query.direction.toUpperCase() : 'ASC']];

    let mark = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Mark.findAndCountAll({
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
        count: mark.rows.length,
        totalCount: mark.count,
        mark: _.pickArrayExt(mark.rows, ['value', 'date', 'student_id', 'teacher_id', 'class_id', 'subject_id', 'id'])
    });
}

/**
 * GET /api/v1/mark/:id
 * @param req req
 * @param res res
 */

async function get(req, res) {
    let mark = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Mark.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });
        }
    );

    if (!mark) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Mark')}), req.params.id);
    }

    res.json({
        mark: _.pickExt(mark, ['value', 'date', 'student_id', 'teacher_id', 'class_id', 'subject_id', 'id'])
    });
}

/**
 * POST /api/v1/mark
 * @param req req
 * @param res res
 */

async function create(req, res) {
    //@f:off
    objectValidator.createValidator(req.body)
        .field('value')
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .field('date')
        .optional()
        .isDate(req.__mf('Invalid date.'))
        .validate();
    //@f:on

    //It was made in order to not create empty fields in database
    _.removeEmptyFieldsExt(req.body, ' ', undefined);

    let newMark = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.Mark.create(req.body, {transaction: t});
        }
    );

    res.json({
        id: newMark.id
    });
}

/**
 * PUT /api/v1/mark/:id
 * @param req req
 * @param res res
 */

async function update(req, res) {
    //@f:off
    objectValidator.createValidator(req.body, {allowUndefined: true})
        .field('value')
        .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Value')}), {min: 1, max: 255})
        .isInteger(req.__mf('Invalid value.'))
        .field('date')
        .optional()
        .isDate(req.__mf('Invalid date.'))
        .validate();
    //@f:on

    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let mark = await models.Mark.find({
                where: {
                    id : req.params.id
                },
                transaction: t
            });

            if (!mark) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Mark')}), req.params.id);
            }

            //it was made in order to delete empty fields from database
            _.removeEmptyFieldsExt(req.body, '', null);

            _.assign(mark, req.body);

            await mark.save({transaction: t});
        }
    );

    res.status(HTTPStatus.NO_CONTENT).send();
}

/**
 * DELETE /api/v1/mark/:id
 * @param req req
 * @param res res
 */

async function remove(req, res) {
    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let mark = await models.Mark.find({
                where: {
                    id: req.params.id
                },
                transaction: t
            });

            if (!mark) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('Mark')}), req.params.id);
            }

            await mark.destroy({transaction: t});
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