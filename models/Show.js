const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/viewnify', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const ShowSchema = new Schema({
    title: {
        type: string,
        trim: true,
        unique: true
    },
    image: {
        type: string,
        trim: true,
    },
    crew: {
        type: string,
        trim: true,
        unique: true
    },
    imDbRating: {
        type: array,
    },
})

const Show = mongoose.model("Show", ShowSchema)

module.exports = Show