const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Dislike extends Model {}
Dislike.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    tmDb_id: {
        type: DataTypes.STRING,
        trim: true,
        allowNull:false
    }
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'dislike',
})


module.exports = Dislike