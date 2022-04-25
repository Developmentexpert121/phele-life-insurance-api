const express = require('express');
const insuranceCompanyRouter = express.Router();
const insuranceCompanyModel = require('../models/insuranceCompanies');

insuranceCompanyRouter.post('/company', (req, response) =>{
    console.log(req.body)
    const company = new insuranceCompanyModel(req.body);
    company.save(function(err,result){
        if (err){
            response.json("Error While Stroing");
        }
        else{
            response.json("Data Saved")
        }
    })
})

insuranceCompanyRouter.get('/company-list', (req, response) =>{
    insuranceCompanyModel.find({}, function(err, list){
        if(err){
            console.warn(err);
        }else{
            response.json(list)
        }        
    })
})

module.exports = insuranceCompanyRouter;

