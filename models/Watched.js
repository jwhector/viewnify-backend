const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Watched extends Model { }


Watched.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    tmdb_id: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' }
    },
    watched_with: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'watched',
})

module.exports = Watched