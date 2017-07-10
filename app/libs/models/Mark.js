'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let markSchema = {
    idStudent: Sequelize.INTEGER,
    idSubject: Sequelize.INTEGER,
    date: Sequelize.DATE,
	mark: Sequelize.INTEGER
};
module.exports = sequelize.define('Mark', markSchema);