const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/viewnify', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const UserSchema = new Schema({
    userName: {
        type: string,
        trim: true,
        unique: true
    },
    password: {
        type: string,
        trim: true,
    },
    email: {
        type: string,
        trim: true,
        unique: true
    },
    showsLiked: {
        type: array,
    },
    showsDisiked: {
        type: array,
    },
    friends: {
        type: array,
    },
})

const User = mongoose.model("User", UserSchema)

module.exports = User