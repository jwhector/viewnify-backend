const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/viewnify', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const MovieSchema = new Schema({
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

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie