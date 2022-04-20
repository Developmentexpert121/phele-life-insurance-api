const { response } = require('express');
const express = require('express')
const insuranceCompaniesRouter = express.Router();
const insuranceCompaniesModel = require('../models/insurance-companies')

insuranceCompaniesRouter.get('/companies-list', (req, response) =>{
    insuranceCompaniesModel.find({}, function(error, companies){
        if(error){
            console.warn(error)
        }else{
            response.json(companies)
        }
    })
})

insuranceCompaniesRouter.post('/company', (req, response) =>{
    const insuranceCompany  = new insuranceCompaniesModel(req.body);
    insuranceCompany.save()
})


module.exports = insuranceCompaniesRouter