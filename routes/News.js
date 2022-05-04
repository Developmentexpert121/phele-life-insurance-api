const express = require('express');
const newsRouter = express.Router();
const newsModel = require('../models/news');

// To Delete from Database
newsRouter.route('/deletenews/:id').get(function (req, res) {
    newsModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json('Deleted Successfully');
    });
});

// To Edit Info by id
newsRouter.route('/editnews/:id').get(function (req, res) {
    let id = req.params.id;
    newsModel.findById(id, function (err, newsinfo) {
        res.json(newsinfo);
    });
});

// To Update The news Info
newsRouter.route('/updatenews/:id').post(function (req, res) {
    newsModel.findById(req.params.id, function (err, newsinfo) {
        if (!newsinfo)
            return next(new Error('Unable To Find With This Id'));
        else {
            newsinfo.headline = req.body.headline;
            newsinfo.detail = req.body.detail;
            newsinfo.source = req.body.source;

            newsinfo.save().then(e => {
                res.json('Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update");
                });
        }
    });
});


newsRouter.post('/news', (req, response) => {
    const news = new newsModel(req.body);
    news.save(function (err, result) {
        if (err) {
            response.json("Error While Stroing");
        }
        else {
            response.json("Data Saved")
        }
    })
})

newsRouter.get('/news', (req, response) => {
    newsModel.find({}, function (err, headline) {
        if (err) {
            console.warn(err);
        } else {
            response.json(headline)
        }
    })
})

module.exports = newsRouter;

