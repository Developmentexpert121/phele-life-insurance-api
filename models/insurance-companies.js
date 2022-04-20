const mongoose = require('mongoose')
const Schema = mongoose.Schema

const insuranceCompanies = new Schema({
    photo: {
        type: String
    },
    name:{
        type: String
    },
    mobile:{
        type:String
    },
    url:{
        type:String
    }

})

module.exports = mongoose.model('insuranceCompanies', insuranceCompanies)