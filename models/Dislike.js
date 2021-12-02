const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Dislike extends Model {}
Dislike.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    tmdb_id: {
        type: DataTypes.STRING,
        trim: true,
        allowNull:false
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
    modelName: 'dislike',
})


module.exports = Dislike