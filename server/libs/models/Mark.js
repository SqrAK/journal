'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let markSchema = {
    value: { type: Sequelize.INTEGER
    },
    date: Sequelize.DATE,
    subject_id:  { type: Sequelize.INTEGER},
    class_id:  { type: Sequelize.INTEGER},
    student_id: { type: Sequelize.INTEGER},
    teacher_id: { type: Sequelize.INTEGER}
};
module.exports = sequelize.define('Mark', markSchema);
