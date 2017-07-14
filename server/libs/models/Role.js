'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let roleSchema = {
    name: Sequelize.STRING
};
module.exports = sequelize.define('Role', roleSchema);
