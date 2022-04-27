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
console.log("company storage is", storage);

insuranceCompaniesRouter.route("/companies-list").post(upload.single('picture'), (req, res) => {
    console.log('company Router ', req.body, "and request file iss",req.file);
    const companyName = req.body.companyName;
    const mobile = req.body.mobile;
    const url = req.body.url;
    const picture = req.file.filename;

    console.log("Name is ",companyName ,"and mobile ",mobile ,"with url",url,"picture name is",picture );

    const newCompanyData = {
        companyName,
        mobile,
        url,
        picture
    }
    console.log("New Company Data ", newCompanyData);

    const newCompany = new insuranceCompaniesModel(newCompanyData);
    console.log("Company Data modal ", newCompany);

    newCompany.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error is ', err))

});

insuranceCompaniesRouter.get('/companies-list', (req, response) =>{
    insuranceCompaniesModel.find({}, function(error, companies){
        if(error){
            console.warn(error)
        }else{
            response.json(companies)
        }
    })
})

module.exports = insuranceCompaniesRouter