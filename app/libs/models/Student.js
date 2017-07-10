'use strict';

const sequelize = require('utils/sequelize'),
    Sequelize = require('sequelize'),
teacher = require('models/Teacher');


let studentSchema = {
    name: Sequelize.STRING,
    id_teacher: Sequelize.INTEGER
};
/*
let studentSchema = {
    name: { type: Sequelize.STRING, allowNull: false},
    id_teacher: {
   type: Sequelize.INTEGER,

   references: {
    
     model: teacher,

     key: 'id'
    
   }
 }
};
*/
module.exports = sequelize.define('Student', studentSchema);
