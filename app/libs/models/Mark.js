'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let markSchema = {
    idStudent: Sequelize.UUID,
    idSubject: Sequelize.UUID,
    date: Sequelize.DATE,
    mark: Sequelize.INTEGER
};
module.exports = sequelize.define('Mark', markSchema);
