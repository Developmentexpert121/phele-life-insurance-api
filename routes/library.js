const { response } = require('express')
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const LibraryRouter = express.Router()
const LibraryModel = require('../models/library')
const app = express();
app.use(cors());

const storage = multer.diskStorage({
    getDestination: (req, file, cb) => {
        cb(null, 'public')
    },
    getFilename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
console.log("storage is", storage, "destination is ", storage.getDestination, "and filename is", storage.getFilename);

// const upload = multer({storage}).single('file');
const upload = multer({ storage });
console.log('Multer value is ', upload);


LibraryRouter.route("/library").post(upload.single('picture'), (req, res) => {
    console.log('Library Router ', req.body);
    const slug = req.body.slug;
    const title = req.body.title;
    const description = req.body.description;
    const picture = req.body.picture;

    const newLibraryData = {
        slug,
        title,
        description,
        picture
    }
    console.log("New Library Data ", newLibraryData);

    const newLibrary = new LibraryModel(newLibraryData);
    console.log("Library Data modal ", newLibrary);

    newLibrary.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error is ', err))

    // upload(req, res, (err) => {
    //     if (err) {
    //         return res.status(500).json(err)
    //     }

    //     return res.status(200).send(req.files)
    // })
    // console.log('Uppload..');
});

// LibraryRouter.post('/library', (req, response) =>{

//     console.log(req.body)
//     const library = new LibraryModel(req.body);
//     library.save(function(err, result){
//         if(err){
//             response.json("Error While Stroing");
//         }else{
//             response.json("Data Stored Successfully");
//         }
//     })
// })

LibraryRouter.get('/library', (res, response) => {
    LibraryModel.find({}, function (err, library) {
        if (err) {
            console.warn(err);
        } else {
            response.json(library)
        }
    })
})

module.exports = LibraryRouter;