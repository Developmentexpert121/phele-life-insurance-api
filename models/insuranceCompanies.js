const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const insuranceCompanies = new Schema({
    name : {
        type: String
    },
    logo: {
        type: String
    }
})

module.exports = mongoose.model('insuranceCompanies', insuranceCompanies);