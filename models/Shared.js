const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Shared extends Model {}
Shared.init({
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
    watchparty_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'watchparty', key: 'id' }
    } 
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'shared',
})


module.exports = Shared