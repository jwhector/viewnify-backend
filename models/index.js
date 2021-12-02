const Like = require('./Like');
const Friend = require('./Friend');
const Dislike = require('./Dislike');
const User = require('./User');
const Watchparty = require('./Watchparty');
const Shared = require('./Shared');
const Member = require('./Member');

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

User.hasMany(Watchparty, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Watchparty.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Member, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Member.belongsTo(User, {
    foreignKey: 'user_id'
});

Watchparty.hasMany(Member, {
    foreignKey: 'watchparty_id',
    onDelete: 'CASCADE'
});

Member.belongsTo(Watchparty, {
    foreignKey: 'watchparty_id'
});

Watchparty.hasMany(Shared, {
    foreignKey: 'watchparty_id',
    onDelete: 'CASCADE'
});

Shared.belongsTo(Watchparty, {
    foreignKey: 'watchparty_id'
});


module.exports = {
    Like, Friend, Dislike, User, Watchparty, Shared, Member
}