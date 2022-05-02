const { response } = require('express');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const insuranceCompaniesRouter = express.Router();
const insuranceCompaniesModel = require('../models/insurance-companies')
const app = express();
app.use(cors());
// import abc from '../phele-life-insurance/public'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../phele-life-insurance/public')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })

// Add
insuranceCompaniesRouter.route("/companies-list").post(upload.single('picture'), (req, res) => {

    const companyName = req.body.companyName;
    const mobile = req.body.mobile;
    const url = req.body.url;
    const picture = req.file.filename;
    console.log("picture", picture);
    console.log("req file", req.file);
    // console.log("picture", picture);

    const newCompanyData = {
        companyName,
        mobile,
        url,
        picture
    }
    console.log("new company data", newCompanyData);


    const newCompany = new insuranceCompaniesModel(newCompanyData);
    console.log("new company", newCompany);

    newCompany.save()
        .then(() => res.status(200).json('user added'))
        .catch(err => res.status(400).json('Error is ', err))

});

insuranceCompaniesRouter.get('/companies-list', (req, response) => {
    insuranceCompaniesModel.find({}, function (error, companies) {
        if (error) {
            console.warn(error)
        } else {
            response.status(200).json(companies)
        }
    })
})

// // To Update The Company Info
// insuranceCompaniesRouter.route('/updateCompany/:id').post(upload.single('picture'), (req, res) =>{
//     insuranceCompaniesModel.findById(req.params.id, function (err, info) {
//         console.log(info);
//         if (!info)
//             return next(new Error('Unable To Find With This Id'));
//         else {
//             console.log("req body is",req.body);
//             info.companyName = req.body.companyName;
//             info.mobile = req.body.mobile;
//             info.url = req.body.url;
//             info.picture = req.file.filename;
//             console.log('info',info);

//             const updatedCompany = new insuranceCompaniesModel(info);
//             updatedCompany.save().then(e => {
//                 res.status(200).json('Updated Successfully');
//             })
//                 .catch(err => {
//                     res.status(400).send("Unable To Update", err);
//                 });
//         }
//     });
// });



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
                    res.status(400).send("Unable To Update", err);
                });
        }
    });
});


// To Delete from Database
insuranceCompaniesRouter.route('/deletecompany/:id').get(function (req, res) {
    insuranceCompaniesModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.status(400).json(err);
        else res.status(200).json('Deleted Successfully');
    });
});

// To Edit Info by id
insuranceCompaniesRouter.route('/editcompany/:id').get(function (req, res) {
    let id = req.params.id;
    insuranceCompaniesModel.findById(id, function (err, info) {
        res.status(200).json(info);
    });
});

module.exports = insuranceCompaniesRouter