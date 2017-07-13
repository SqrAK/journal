'use strict';

const promise = require('utils/promise'),
    sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize'),
    bcrypt = require('utils/bcrypt'),
    role = require('models/Role'),
    SALT_WORK_FACTOR = 10;

/**
 * User entity scheme.
 * @type {*|Schema}
 */

let userModel = sequelize.define('User', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        required: true
    },
    verifyLinkExpiration: {
        type: Sequelize.STRING
    },
    verifyToken: {
        type: Sequelize.STRING
    },
    role_id: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM,
        values: ['ACTIVE', 'BLOCKED'],
        defaultValue: 'ACTIVE',
        allowNull: false
    },
}, {
    instanceMethods: {
        comparePasswordAsync: async function (candidatePassword) {
            return await bcrypt.compareAsync(candidatePassword || '', this.password);
        }
    }
});

/**
 * Save-hook that fills password field with bcrypt hash.
 */
userModel.addHook('beforeCreate', async user => {
    if (!user.changed('password')) {
        return;
    }

    user.password = await bcrypt.hashAsync(user.password, await bcrypt.genSaltAsync(SALT_WORK_FACTOR));
});

module.exports = userModel;



