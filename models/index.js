const Like = require('./Like');
const Dislike = require('./Dislike');
const User = require('./User');
const Watchparty = require('./Watchparty');
const Shared = require('./Shared');
const Member = require('./Member');
const Watched = require('./Watched');
const With = require('./With');

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

Watched.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Watched, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

With.belongsTo(Watched,{
    foreignKey: 'watched_id'
})

Watched.hasMany(With, {
    foreignKey: 'watched_id',
    onDelete: 'CASCADE'
})

module.exports = {
    Like, Friend, Dislike, User, Watchparty, Shared, Member, Watched, With
}