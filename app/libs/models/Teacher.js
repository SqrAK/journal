'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let teacherSchema = {
    name: Sequelize.STRING
};
module.exports = sequelize.define('Teacher', teacherSchema);




