const express = require('express');
const faqsRouter = express.Router();
const faqsModel = require('../models/faqs');

faqsRouter.post('/question', (req, response) =>{
    const faqs = new faqsModel(req.body);
    faqs.save(function(err,result){
        if (err){
            response.json("Error While Stroing");
        }
        else{
            response.json("Data Saved")
        }
    })
})

faqsRouter.get('/question', (req, response) =>{
    faqsModel.find({}, function(err, questions){
        if(err){
            console.warn(err);
        }else{
            response.json(questions)
        }        
    })
})

module.exports = faqsRouter;

