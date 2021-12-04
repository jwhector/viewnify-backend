const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class With extends Model { }

With.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    watched_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'watched', key: 'id' }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'with',
})

module.exports = With