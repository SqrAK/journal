'use strict';

const _ = require('utils/lodash-ext');
let models = require('utils/module-packer').packModule(__dirname, _.toPascalCaseExt);

models.Role.hasMany(models.User, {foreignKey: 'role_id'});
models.User.belongsTo( models.Role, {foreignKey: 'role_id'});

models.Subject.hasMany(models.Class, {foreignKey: 'subject_id'});
models.Class.belongsTo(models.Subject, {foreignKey: 'subject_id'});

models.User.hasMany(models.Lesson, {foreignKey: 'teacher_id'});
models.Lesson.belongsTo(models.User, {foreignKey: 'teacher_id'});
models.Class.hasMany(models.Lesson, {foreignKey: "class_id"});
models.Lesson.belongsTo(models.Class, {foreignKey: "class_id"});

models.Subject.hasMany(models.Mark, {foreignKey: 'subject_id'});
models.Mark.belongsTo(models.Subject, {foreignKey: 'subject_id'});
models.User.hasMany(models.Mark, {foreignKey: 'student_id'});
models.Mark.belongsTo(models.User, {foreignKey: 'student_id'});
models.Class.hasMany(models.Mark, {foreignKey: 'class_id'});
models.Mark.belongsTo(models.Class, {foreignKey: 'class_id'});
models.User.hasMany(models.Mark, {foreignKey: 'teacher_id'});
models.Mark.belongsTo(models.User, {foreignKey: 'teacher_id'});

module.exports = models;