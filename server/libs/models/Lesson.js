/**
 * Created by alice on 12.07.17.
 */
'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize');

let lessonSchema = {
    class_id: { type: Sequelize.INTEGER},
    teacher_id: { type: Sequelize.INTEGER}
};
module.exports = sequelize.define('Lesson', lessonSchema);
