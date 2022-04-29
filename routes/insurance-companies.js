const { response } = require('express');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const insuranceCompaniesRouter = express.Router();
const insuranceCompaniesModel = require('../models/insurance-companies')
const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    getDestination: (req, file, cb) => {
        cb(null, 'public')
    },
    getFilename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

insuranceCompaniesRouter.route("/companies-list").post(upload.single('picture'), (req, res) => {

    const companyName = req.body.companyName;
    const mobile = req.body.mobile;
    const url = req.body.url;
    const picture = req.file.filename;

    const newCompanyData = {
        companyName,
        mobile,
        url,
        picture
    }

    const newCompany = new insuranceCompaniesModel(newCompanyData);

    newCompany.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error is ', err))

});

insuranceCompaniesRouter.get('/companies-list', (req, response) => {
    insuranceCompaniesModel.find({}, function (error, companies) {
        if (error) {
            console.warn(error)
        } else {
            response.json(companies)
        }
    })
})


// To Update The Company Info
insuranceCompaniesRouter.route('/updateCompany/:id').post(function (req, res) {
    insuranceCompaniesModel.findById(req.params.id, function (err, info) {
        console.log(info);
        if (!info)
            return next(new Error('Unable To Find With This Id'));
        else {
            info.companyName = req.body.companyName;
            info.mobile = req.body.mobile;
            info.url = req.body.url;
            info.picture = req.body.picture;

            const updatedCompany = new insuranceCompaniesModel(info);
            updatedCompany.save().then(e => {
                res.status(200).json('Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update",err);
                });
        }
    });
});


// To Delete from Database
insuranceCompaniesRouter.route('/deletecompany/:id').get(function (req, res) {
    insuranceCompaniesModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json('Deleted Successfully');
    });
});

// To Edit Info by id
insuranceCompaniesRouter.route('/editcompany/:id').get(function (req, res) {
    let id = req.params.id;
    insuranceCompaniesModel.findById(id, function (err, info) {
        res.json(info);
    });
});

module.exports = insuranceCompaniesRouter