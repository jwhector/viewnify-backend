const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const randomURL = require('../middleware/randomURL')

class Watchparty extends Model { }
Watchparty.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    url:{
        type: DataTypes.STRING,
        allowNull:true
    },
    limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' }
    }
}, {
    hooks:{
        beforeCreate(newParty) {
            newParty.url = randomURL()
            return newParty;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'watchparty',
})


module.exports = Watchparty