const { response } = require('express')
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const LibraryRouter = express.Router()
const LibraryModel = require('../models/library')
const app = express();
app.use(cors());

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


LibraryRouter.route("/library").post(upload.single('picture'), (req, res) => {

    const slug = req.body.slug;
    const title = req.body.title;
    const description = req.body.description;
    const picture = req.file.filename;

    const newLibraryData = {
        slug,
        title,
        description,
        picture
    }

    const newLibrary = new LibraryModel(newLibraryData);
    newLibrary.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error is ', err))
});

// To Update The library Info
LibraryRouter.route('/updatelibrary/:id').post(function (req, res) {
    LibraryModel.findById(req.params.id, function (err, info) {
        console.log(info);
        if (!info)
            return next(new Error('Unable To Find With This Id'));
        else {
            info.slug = req.body.slug;
            info.title = req.body.title;
            info.description = req.body.description;
            info.picture = req.body.picture;

            const updatedlibrary = new LibraryModel(info);
            updatedlibrary.save().then(e => {
                res.status(200).json('Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update", err);
                });
        }
    });
});


LibraryRouter.get('/library', (res, response) => {
    LibraryModel.find({}, function (err, library) {
        if (err) {
            console.warn(err);
        } else {
            response.json(library)
        }
    })
})

// To Delete from Database
LibraryRouter.route('/deletelibrary/:id').get(function (req, res) {
    LibraryModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json('Deleted Successfully');
    });
});

// To Edit Info by id
LibraryRouter.route('/editlibrary/:id').get(function (req, res) {
    let id = req.params.id;
    LibraryModel.findById(id, function (err, info) {
        res.json(info);
    });
});

module.exports = LibraryRouter;