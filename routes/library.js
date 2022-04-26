const { response } = require('express')
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const LibraryRouter = express.Router()
const LibraryModel = require('../models/library')
const app = express();

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).single('file');


// pending

app.post('/library', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
    console.log('Uppload..');
});

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