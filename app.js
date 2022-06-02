//----------- Importing Modules -----------//
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();



// Adding DataBase
// const db = require('./config/keys').MongoURI;


// connect to the database
// mongoose.connect('mongodb://localhost:27017/healthKeeper',
mongoose.connect('mongodb+srv://Harsh_arv:harsh123@cluster0.wkjgb.mongodb.net/HealthTraker?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));



// setting up view engine and its layout
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use("/assets", express.static('./assets'));


// adding a body parser
app.use(express.urlencoded({ extended: false }));

// Create a session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


// adding flash messeges
app.use(flash());

// adding Global Variables for flash messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// add routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 2000;


// creating server
app.listen(PORT, console.log(`Server started on port  ${PORT}`));

