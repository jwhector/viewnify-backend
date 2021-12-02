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
  friends_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'friend',
  }
)

module.exports = Friend

