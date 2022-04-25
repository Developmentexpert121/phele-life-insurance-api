const { response } = require('express');
const express = require('express')
const insuranceCompaniesRouter = express.Router();
const insuranceCompaniesModel = require('../models/insurance-companies')

insuranceCompaniesRouter.post('/company-list', (req, response) =>{
    console.log(req)
    const insuranceCompany  = new insuranceCompaniesModel(req.body);
     
    insuranceCompany.save(function(err,result){
        if (err){
            console.log(err)
            response.json("Error While Stroing");
        }
        else{
            response.json("Data Saved")
        }
    })
})

insuranceCompaniesRouter.get('/companies-list', (req, response) =>{
    insuranceCompaniesModel.find({}, function(error, companies){
        if(error){
            console.warn(error)
        }else{
            response.json(companies)
        }
    })
})




module.exports = insuranceCompaniesRouter