const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require("bcrypt");

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    // username: {
    //     type: DataTypes.STRING,
    //     trim: true,
    //     unique: true,
    //     allowNull: false,
    //     validate: {
    //         len: [6,30]
    //     }
    // },
    password: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
        validate: {
            len:[8]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    genres: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false
    },
    streaming_service: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false
    },    
},{
    hooks:{
        beforeCreate(newUser) {
            // newUser.username = newUser.username.toLowerCase();
            newUser.password = bcrypt.hashSync(newUser.password, 5);
            return newUser;
        },
        beforeUpdate(updatedUser) {
            // updatedUser.username = updatedUser.username.toLowerCase();
            updatedUser.password = bcrypt.hashSync(updatedUser.password, 5);
            return updatedUser;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

module.exports = User