const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/viewnify', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const ShowSchema = new Schema({
    imDb_id:{
        type: String,
        unique: true,
        null: false
    },
    title: {
        type: String,
        trim: true,
        unique: true,
        null: false
    },
    image: {
        type: String,
        trim: true,
        null: false
    },
    crew: {
        type: String,
        trim: true,
        unique: true,
        null: false
    },
    imDbRating: {
        type: Number,
    },
})

const Show = mongoose.model("Show", ShowSchema)

module.exports = Show