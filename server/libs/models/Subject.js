
'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let subjectSchema = {
    name: Sequelize.STRING
};

module.exports = sequelize.define('Subject', subjectSchema);