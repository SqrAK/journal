/**
 * Created by alice on 12.07.17.
 */
'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let classSchema = {
    subject_id: { type: Sequelize.INTEGER},
    number: { type: Sequelize.INTEGER}
};
module.exports = sequelize.define('Class', classSchema);
