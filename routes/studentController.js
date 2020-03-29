var express = require('express');
var router = express.Router();

var student = require('../models/student');

router.get('/', function (request, response) {
    collection.find().sort({ _id: 1 }).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        }
        var returnData = new Array();
        for (var i = 0; i < result.length; i++) {
            var studentModel = require('../models/student');
            studentModel = studentModel.student(result[i]._id,
                result[i].studentFirstName,
                result[i].studentLastName,
                result[i].studentAge,
                result[i].gender,
                result[i].emailAddress,
                result[i].phoneNumber,
                result[i].enrolledSemester,
                result[i].advisor,
                result[i].subjects);
            console.log("Data : " + JSON.stringify(studentModel));
            returnData.push(studentModel);
        }

        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(returnData));
    });
});

router.post('/', function (request, response) {
    console.log("Request Body :" + JSON.stringify(request.body));

    if (request.body.studentId
        && request.body.fname
        && request.body.lname
        && request.body.age
        && request.body.gender
        && request.body.email
        && request.body.phone
        && request.body.enrolled
        && request.body.advisor) {

        var studentModel = require('../models/student');

        studentModel._id = request.body.studentId;
        studentModel.studentFirstName = request.body.fname;
        studentModel.studentLastName = request.body.lname;
        studentModel.studentAge = request.body.age
        studentModel.gender = request.body.gender
        studentModel.emailAddress = request.body.email;
        studentModel.phoneNumber = request.body.phone;
        studentModel.enrolledSemester = request.body.enrolled;
        studentModel.advisor = request.body.advisor;

        collection.insertOne(studentModel, function (err, res) {
            if (err) {
                throw err;
            };
        });

        response.status(201).end("Student Created");
    } else {
        response.status(400).end("Bad Request. Invalid Request Body");
    }
});

router.post('/:studentId', function (request, response) {

    console.log("ID : " + request.params.studentId);
    var studentId = request.params.studentId;
    collection.find({ "_id": studentId }).sort({ _id: 1 }).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        }
        var returnData = new Array();
        for (var i = 0; i < result.length; i++) {
            var studentModel = require('../models/student');
            studentModel = studentModel.student(result[i]._id,
                result[i].studentFirstName,
                result[i].studentLastName,
                result[i].studentAge,
                result[i].gender,
                result[i].emailAddress,
                result[i].phoneNumber,
                result[i].enrolledSemester,
                result[i].advisor);

            returnData.push(studentModel);
        }

        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(returnData));
    });
});

router.put('/', function (request, response) {

    console.log("New Data : " + JSON.stringify(request.body));

    if (request.body.studentId
        && request.body.studentFirstName
        && request.body.studentLastName
        && request.body.studentAge
        && request.body.gender
        && request.body.emailAddress
        && request.body.phoneNumber
        && request.body.enrolledSemester
        && request.body.advisor) {

        var studentModel = require('../models/student');

        //  studentModel._id = request.body.studentId;
        studentModel.studentFirstName = request.body.studentFirstName;
        studentModel.studentLastName = request.body.studentLastName;
        studentModel.studentAge = request.body.studentAge;
        studentModel.gender = request.body.gender;
        studentModel.emailAddress = request.body.emailAddress;
        studentModel.phoneNumber = request.body.phoneNumber;
        studentModel.enrolledSemester = request.body.enrolledSemester;
        studentModel.advisor = request.body.advisor;

        collection.replaceOne({ "_id": request.body.studentId }, studentModel, function (err, res) {
            if (err) {
                throw err;
            };
        });

        response.status(200).send(studentModel);
    } else {
        response.status(400).end("Bad Request. Invalid Request Body");
    }
});

router.patch('/', function (request, response) {
    if (request.body.advisorUpdate) {
        console.log("Body : " + JSON.stringify(request.body));
        collection.updateOne({ "_id": request.body.studentId }, { $set: { "advisor": request.body.advisor } });
        response.status(200).end("Successfully Updated Student Advisor");
    } else if (request.body.enrollUpdate) {
        collection.updateOne({ "_id": request.body.studentId }, { $set: { "enrolledSemester": request.body.enrolledSemester } });
        response.status(200).end("Successfully Updated Student Enrollment");
    } else {
        response.status(400).end("Bad Request. Invalid Request Body");
    }
});

router.delete('/:studentId', function (request, response) {
    collection.deleteOne({ "_id": request.params.studentId });
    response.status(200).end("Successfully Deleted Student");
});

module.exports = router;