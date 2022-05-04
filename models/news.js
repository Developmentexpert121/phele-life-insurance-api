const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const news = new Schema({
    headline: {
        type: String
    },
    detail: {
        type: String
    },
    source: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('news', news);