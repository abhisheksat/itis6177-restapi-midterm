//  @author: Abhishek S
//  Filename: index.js
//  This is index.js (main node.js app). 
//  It has all configurations for the entire node.js app
//  All required dependencies, routings, express config, body-parser, middleware and Swagger documentation
//  Also connects to the MongoDB and gives access to students and subjects collections

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

const swaggerDoc = require('./swaggerDoc');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/simid';

var app = express();

//  register the bodyParser middleware for processing forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Connection to MongoDB
MongoClient.connect(url, function (err, db) {
    console.log("Connected correctly to the server");
    var myLearningMongoDB = db.db('simid');
    collection = myLearningMongoDB.collection('students');
    subjectCollection = myLearningMongoDB.collection('subjects');
});

var controller = require('./routes/controller.js');
app.use('/', controller);

var studentController = require('./routes/studentController.js');
app.use('/api/v1/students', studentController);

var subjectController = require('./routes/subjectController.js');
app.use('/api/v1/subjects', subjectController);

swaggerDoc(app);
app.listen(3000);