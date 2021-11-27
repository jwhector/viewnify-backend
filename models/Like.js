const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}


Like.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    tmDb_id:{
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },  
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
})

module.exports = Like