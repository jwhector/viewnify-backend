const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Member extends Model {}
Member.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' }
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
    modelName: 'member',
})


module.exports = Member