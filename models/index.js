const Like = require('./Like');
const Friend = require('./Friend');
const Dislike = require('./Dislike');
const User = require('./User');

User.hasMany(Like, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Like.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Dislike, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Dislike.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Friend, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Friend.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

module.exports = {
    Like, Friend, Dislike, User
}