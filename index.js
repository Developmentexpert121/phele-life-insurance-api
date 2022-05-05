var express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('./db');
const bodyParser = require('body-parser');

<<<<<<< HEAD

const faqsRoute = require('./routes/faqs')
const LibraryRoute = require('./routes/library')
const insuranceCompanyRouter = require('./routes/insuranceCompanies')
const newsMediaRoute = require('./routes/newsMedia')
=======
const faqsRoute = require('./routes/faqs');
const insuranceCompaniesRoute = require('./routes/insurance-companies');
const LibraryRoute = require('./routes/library');
const GlossaryRoute = require('./routes/glossary');
const NewsRoute = require('./routes/News');
>>>>>>> 8ed7fdf323249f7bbba0c68de3f51c324259569e

mongoose.promise = global.promise;
mongoose.connect(config.DB,{useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/faqs', faqsRoute);
app.use('/library', LibraryRoute);
app.use('/glossary', GlossaryRoute);
app.use('/news', NewsRoute);

// app.use('/upload', LibraryRoute);

// app.get('/list', (req, res, next) =>{
//     res.json(['Tonny Stark','Steve Rogers','Bruce Banner','Clint Barton','Thor']);
// })

app.listen(4000, ()=>{
    console.log("Server Running at Port 4000");
})