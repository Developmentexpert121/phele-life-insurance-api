const express = require('express');
const glossaryRouter = express.Router();
const glossaryModel = require('../models/glossary');


glossaryRouter.post('/keyword', (req, response) =>{
    const glossary = new glossaryModel(req.body);
    glossary.save(function(err,result){
        if (err){
            response.json("Error While Stroing");
        }
        else{
            response.json("Data Saved")
        }
    })
})

glossaryRouter.get('/keyword', (req, response) =>{
    glossaryModel.find({}, function(err, keyword){
        if(err){
            console.warn(err);
        }else{
            response.json(keyword)
        }        
    })
})

module.exports = glossaryRouter;

