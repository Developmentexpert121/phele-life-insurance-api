const express = require('express');
const faqsRouter = express.Router();
const faqsModel = require('../models/faqs');

// To Delete from Database
faqsRouter.route('/deletefaqs/:id').get(function (req, res) {
    faqsModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json('Deleted Successfully');
    });
});

// To Edit Info by id
faqsRouter.route('/editfaqs/:id').get(function (req, res) {
    let id = req.params.id;
    faqsModel.findById(id, function (err, faqinfo) {
        res.json(faqinfo);
    });
});

// To Update The Faqs Info
faqsRouter.route('/updatefaqs/:id').post(function (req, res) {
    faqsModel.findById(req.params.id, function (err, faqinfo) {
        if (!faqinfo)
            return next(new Error('Unable To Find With This Id'));
        else {
            faqinfo.question = req.body.question;
            faqinfo.answer = req.body.answer;

            faqinfo.save().then(e => {
                res.json('Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update");
                });
        }
    });
});

faqsRouter.post('/question', (req, response) => {
    const faqs = new faqsModel(req.body);
    faqs.save(function (err, result) {
        if (err) {
            response.json("Error While Stroing");
        }
        else {
            response.json("Data Saved")
        }
    })
})

faqsRouter.get('/question', (req, response) => {
    faqsModel.find({}, function (err, questions) {
        if (err) {
            console.warn(err);
        } else {
            response.json(questions)
        }
    })
})


module.exports = faqsRouter;

