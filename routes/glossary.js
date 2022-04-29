const express = require('express');
const glossaryRouter = express.Router();
const glossaryModel = require('../models/glossary');


// To Delete from Database
glossaryRouter.route('/deleteGlossary/:id').get(function (req, res) {
    glossaryModel.findByIdAndRemove({ _id: req.params.id }, function (err, glossarykeyword) {
        if (err) res.json(err);
        else res.json('Deleted Successfully');
    });
});

// To Edit Info by id
glossaryRouter.route('/editglossary/:id').get(function (req, res) {
    let id = req.params.id;
    glossaryModel.findById(id, function (err, info) {
        res.json(info);
    });
});


// To Update The glossary Info
glossaryRouter.route('/updateglossary/:id').post(function (req, res) {
    glossaryModel.findById(req.params.id, function (err, info) {
        console.log(info);
        if (!info)
            return next(new Error('Unable To Find With This Id'));
        else {
            info.keyword = req.body.keyword;
            info.definition = req.body.definition;

            info.save().then(e => {
                res.json('Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update");
                });
        }
    });
});


glossaryRouter.post('/keyword', (req, response) => {
    const glossary = new glossaryModel(req.body);
    glossary.save(function (err, result) {
        if (err) {
            response.json("Error While Stroing");
        }
        else {
            response.json("Data Saved")
        }
    })
})

glossaryRouter.get('/keyword', (req, response) => {
    glossaryModel.find({}, function (err, keyword) {
        if (err) {
            console.warn(err);
        } else {
            response.json(keyword)
        }
    })
})

module.exports = glossaryRouter;

