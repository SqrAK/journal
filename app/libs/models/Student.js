'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let studentSchema = {
    name: Sequelize.STRING,
    id_teacher: Sequelize.INTEGER
};
module.exports = sequelize.define('Student', studentSchema);
