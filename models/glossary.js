const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const glossary = new Schema({
    keyword : {
        type: String
    },
    definition: {
        type: String
    }
})

module.exports = mongoose.model('glossary', glossary);