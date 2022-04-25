var express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('./db');
const bodyParser = require('body-parser');


const faqsRoute = require('./routes/faqs')
const LibraryRoute = require('./routes/library')
const insuranceCompanyRouter = require('./routes/insuranceCompanies')
const newsMediaRoute = require('./routes/newsMedia')

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
app.use('/company', insuranceCompanyRouter)
app.use('/media', newsMediaRoute)

// app.get('/list', (req, res, next) =>{
//     res.json(['Tonny Stark','Steve Rogers','Bruce Banner','Clint Barton','Thor']);
// })

app.listen(4000, ()=>{
    console.log("Server Running at Port 4000");
})