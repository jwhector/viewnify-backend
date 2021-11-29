const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Like extends Model {}


Like.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    tmdb_id:{
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    }, 
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' }
    } 
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
})

module.exports = Like