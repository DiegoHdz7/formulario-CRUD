const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//connecting to db
mongoose.connect('mongodb://localhost/crud-mongo')
                .then(db =>console.log('db connected'))
                .catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT ||3000);// process es por si el host asigna un port
app.set('views', path.join(__dirname+'/views'));
app.set('view engine', 'ejs');



//middlewares
app.use(morgan('dev'));

//routes
app.use('/', indexRoutes);

//starting server
app.listen(app.get('port'), ()=>{
    console.log(`server on port: ${app.get('port')}` );
    console.log(path.join(__dirname+'/views'));
});
