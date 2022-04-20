const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const faqs = new Schema({
    question : {
        type: String
    },
    answer: {
        type: String
    }
})

module.exports = mongoose.model('faqs', faqs);