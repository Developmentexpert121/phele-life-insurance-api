const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const newsMedia = new Schema({
    name : {
        type: String
    },
    logo: {
        type: String
    }
})

module.exports = mongoose.model('newsMedia', newsMedia);