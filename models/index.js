const Like = require('./Like');
const Friend =require('./Friend');
const Dislike =require('./Dislike');
const User =require('./User');

User.hasMany(Like, {
    foreignKey: 'user_id',
    onDelete:'CASCADE'
});

Like.hasOne(User, {
    foreignKey: 'user_id'
});

User.hasMany(Dislike, {
    foreignKey: 'user_id',
    onDelete:'CASCADE'
});

Dislike.hasOne(User, {
    foreignKey: 'user_id'
});

User.hasMany(Friend, {
    foreignKey: 'user_id',
    onDelete:'CASCADE'
});

Friend.hasMany(User, {
    foreignKey: 'user_id'
});


module.exports = {
    Like, Friend, Dislike, User
}