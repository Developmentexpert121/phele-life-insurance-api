const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const library = new Schema({
    slug:{
        type: String
    },
    title:{
        type: String
    },
    description:{
        type: String
    }
})

module.exports  = mongoose.model('library', library)