var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    subjectCollection.find().sort({ subject: 1 }).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        }
        var returnData = new Array();
        for (var i = 0; i < result.length; i++) {
            var subjectModel = require('../models/subject');
            subjectModel = subjectModel.subject(result[i].subject, result[i].instructor);
            console.log("Data : " + JSON.stringify(subjectModel));
            returnData.push(subjectModel);
        }
        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(returnData));
    });
});

router.get('/instructors', function (request, response) {
    subjectCollection.aggregate([{ $group: { _id: '$instructor', count: { $sum: 1 } } }, { $sort: { '_id': 1 } }]).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        }
        var returnData = new Array();
        for (var i = 0; i < result.length; i++) {
            var instructorModel = require('../models/instructor');
            instructorModel = instructorModel.instructor(result[i]._id, result[i].count);
            console.log("Data : " + JSON.stringify(instructorModel));
            returnData.push(instructorModel);
        }
        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(returnData));
    });
});

router.post('/instructors/:instId', function (request, response) {
    subjectCollection.find({ "instructor": request.params.instId }).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        }
        var returnData = new Array();
        for (var i = 0; i < result.length; i++) {
            var subjectModel = require('../models/subject');
            subjectModel = subjectModel.subject(result[i].subject, result[i].instructor);
            console.log("Data : " + JSON.stringify(subjectModel));
            returnData.push(subjectModel);
        }
        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(returnData));
    });
});

router.get('/classroom/:subname', function (request, response) {
    var subname = request.params.subname;
    subjectCollection.findOne({ subject: subname }, function (err, result) {
        if (err) {
            throw err;
        };
        var subjectModel = require('../models/subject');
        subjectModel = subjectModel.subject(result.subject, result.instructor);
        response.status(200).end(JSON.stringify(subjectModel));
    });
});

router.get('/classroomstudents/:subname', function (request, response) {
    var subname = request.params.subname;

    collection.find({ subjects: subname }).sort({ _id: 1 }).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        };

        var returnData = new Array();

        for (var i = 0; i < result.length; i++) {
            var studentModel = require('../models/classroomstudents');
            studentModel = studentModel.student(result[i]._id,
                result[i].studentFirstName,
                result[i].studentLastName,
                result[i].emailAddress,
                result[i].enrolledSemester);
            console.log("Data : " + JSON.stringify(studentModel));
            returnData.push(studentModel);
        }
        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(returnData));
    });
});

module.exports = router;