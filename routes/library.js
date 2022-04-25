const { response } = require('express')
const express = require('express')
const LibraryRouter = express.Router()
const LibraryModel = require('../models/library')

LibraryRouter.post('/library', (req, response) =>{
    console.log(req.body)
    const library = new LibraryModel(req.body);
    library.save(function(err, result){
        if(err){
            response.json("Error While Stroing");
        }else{
            response.json("Data Stored Successfully");
        }
    })
})

LibraryRouter.get('/library', (res,response) =>{
    LibraryModel.find({}, function(err, library){
        if(err){
            console.warn(err);
        }else{
            response.json(library)
        }
    })
})

module.exports = LibraryRouter;