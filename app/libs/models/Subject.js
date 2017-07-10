'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let subjectSchema = {
    subjName: Sequelize.STRING  
};
module.exports = sequelize.define('Subject', subjectSchema);


