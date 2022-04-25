const express = require('express');
const newsMediaRouter = express.Router();
const newsMediaModel = require('../models/newsMedia');

newsMediaRouter.post('/media', (req, response) =>{
    console.log(req.body)
    const media = new newsMediaModel(req.body);
    media.save(function(err,result){
        if (err){
            response.json("Error While Stroing");
        }
        else{
            response.json("Data Saved")
        }
    })
})

newsMediaRouter.get('/media-list', (req, response) =>{
    newsMediaModel.find({}, function(err, list){
        if(err){
            console.warn(err);
        }else{
            response.json(list)
        }        
    })
})

module.exports = newsMediaRouter;

