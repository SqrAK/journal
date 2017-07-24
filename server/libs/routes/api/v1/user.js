'use strict';

const models = require("models"),
    HTTPStatus = require('http-status'),
    objectValidator = require('utils/object-validator'),
    errors = require('errors'),
    mailer = require('utils/mailer'),
    moment = require('moment'),
    crypto = require('crypto'),
    sequelize = require('utils/sequelize'),
    _ = require('utils/lodash-ext');

/**
 * GET /api/v1/user
 * @param req req
 * @param res res
 */

async function get(req, res) {
    let user = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.User.find({
                where: {
                    id : req.userId
                },
                transaction: t
            });
        }
    );

    if (!user) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('User')}));
    }

    res.json({
        user: _.pickExt(user, ['login', 'id'])
    });
}

/**
 * POST /api/v1/user
 * @param req req
 * @param res res
 */

async function create(req, res) {
    //@f:off
    objectValidator.createValidator(req.body)
        .field('login')
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Login')}), {min: 1, max: 255})
        .field('password')
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Password')}), {min: 1, max: 255})
        .field('email')
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Email')}), {min: 1, max: 255})
            .isEmail(req.__mf('Please provide valid e-mail.'))
            .normalizeEmail({
                lowercase: true,
                remove_dots: false,
                remove_extension: false
            })
        .validate();
    //@f:on
    let token = crypto.randomBytes(100).toString('hex');

    _.assign(req.body,
        {
            verified: false,
            verifyLinkExpiration: moment().add(1, 'days').unix(),
            verifyToken: token
        }
    );
    let newUser = await sequelize.transaction(async t => {
                // chain all your queries here. make sure you return them.
                return await models.User.create(req.body, {transaction: t});
            }
        );

    await mailer.send('new-user', newUser.email, {login: newUser.login, token: token, id: newUser.id});

    res.json({
        id: newUser.id
    });
}

/**
 * PUT /api/v1/user
 * @param req req
 * @param res res
 */

async function update(req, res) {
    //@f:off
    objectValidator.createValidator(req.body)
        .field('password')
            .isLength(req.__mf('{value} must be from 1 to 255 symbols.', {value: req.__mf('Password')}), {min: 1, max: 255})
        .validate();
    //@f:on

    await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            let user = await models.User.find({
                where: {
                    id : req.userId
                },
                transaction: t
            });

            if (!user) {
                throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('User')}));
            }

            _.assign(user, req.body);
            await user.save({transaction: t});
        }
    );

    res.status(HTTPStatus.NO_CONTENT).send();
}

/**
 * POST /api/v1/user/verify
 * @param req req
 * @param res res
 */

async function verifyEmail(req, res) {
    let user = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.User.find({
                where: {
                    id : req.body.id
                },
                transaction: t
            });
        }
    );

    if (!user) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('User')}));
    }

    if ((moment().unix() - user.verifyLinkExpiration) > 0) {
        throw new errors.SecurityError(req.__mf('The email verification link has expired.'));
    }

    if (user.verifyToken === req.body.token) {
        _.assign(user, {verified: true});
        await user.save();
    }
    else {
        throw new errors.SecurityError(req.__mf('Wrong token.'));
    }

    res.status(HTTPStatus.NO_CONTENT).send();
}

/**
 * POST /api/v1/user/getVerifyLink
 * @param req req
 * @param res res
 */

async function getVerifyLink(req, res) {
    let user = await sequelize.transaction(async t => {
            // chain all your queries here. make sure you return them.
            return await models.User.find({
                where: {
                    id : req.body.id
                },
                transaction: t
            });
        }
    );

    if (!user) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('User')}));
    }

    let token = crypto.randomBytes(100).toString('hex');

    _.assign(user,
        {
            verified: false,
            verifyLinkExpiration: moment().add(1, 'days').unix(),
            verifyToken: token
        }
    );

    await user.save();
    await mailer.send('new-user', user.email, {login: user.login, token: token, id: user.id});
    res.status(HTTPStatus.NO_CONTENT).send();
}

async function student(req, res) {
    let user = await sequelize.transaction(async t => {
            return await models.User.findAll({
                include: [{
                    model: models.Role,
                    where: {name: "Ученик"}
                }],
                transaction: t
            });
        }
    );

    if (!user) {
        throw new errors.NotFoundError(req.__mf('{value} is not found.', {value: req.__mf('User')}));
    }

    res.json({
        user:user
        // user: _.pickExt(user, ['login', 'id'])
    });
}

module.exports = {
    get: get,
    create: create,
    update: update,
    verifyEmail: verifyEmail,
    getVerifyLink: getVerifyLink,
    student:student
};