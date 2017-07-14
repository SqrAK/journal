'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let catSchema = {
    name: Sequelize.STRING,
    bossName: Sequelize.STRING,
    birthDate: Sequelize.DATE
};
module.exports = sequelize.define('Cat', catSchema);
