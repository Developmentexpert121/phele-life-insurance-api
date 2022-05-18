const newLocal = require('dotenv').config({ path: '../phele-life-insurance-api/process.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('./db');
const bodyParser = require('body-parser');

// console.log("Env Process ",process.env.PORT)


const faqsRoute = require('./routes/faqs');
const LibraryRoute = require('./routes/library');
const GlossaryRoute = require('./routes/glossary');
const NewsRoute = require('./routes/News');
const insuranceCompaniesRoute = require('./routes/insurance-companies');

port = process.env.PORT || 4000

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
app.use('/companies', insuranceCompaniesRoute);

// app.use('/upload', LibraryRoute);

// app.get('/list', (req, res, next) =>{
//     res.json(['Tonny Stark','Steve Rogers','Bruce Banner','Clint Barton','Thor']);
// })

app.listen(port, ()=>{
    console.log("Server Running at Port 4000");
})