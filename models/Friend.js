const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Friend extends Model { }

Friend.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'friend',
  }
)

module.exports = Friend

