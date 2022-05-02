const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const news = new Schema({
    headline : {
        type: String
    },
    detail: {
        type: String
    }
})

module.exports = mongoose.model('news', news);