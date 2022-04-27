const mongoose = require('mongoose')
const Schema = mongoose.Schema

const insuranceCompanies = new Schema({
    picture: {
        type: String
    },
    companyName: {
        type: String
    },
    mobile: {
        type: Number
    },
    url: {
        type: String
    }

})

module.exports = mongoose.model('insuranceCompanies', insuranceCompanies)