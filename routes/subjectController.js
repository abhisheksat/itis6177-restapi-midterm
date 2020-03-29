//  @author: Abhishek S
//  Filename: subjectController.js
//  This is subjectController. It caters to all requests for operations related to subject data

var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /subjects:
 *   get:
 *     tags:
 *       - Get All Subjects
 *     description: Fetches all available subject details
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Subject details fetched successfully
 *         schema:
 *           $ref: '#/definition/success'
 *       500:
 *         description: An error occured while processing your request 
 *         schema:
 *           $ref: '#/definition/error'
 */
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

/**
 * @swagger
 * /subjects/instructors:
 *   get:
 *     tags:
 *       - Get All Instructor Details
 *     description: Fetches all available subject instructor details
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Instructor details fetched successfully
 *         schema:
 *           $ref: '#/definition/success'
 *       500:
 *         description: An error occured while processing your request 
 *         schema:
 *           $ref: '#/definition/error'
 */
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

/**
 * @swagger
 * /subjects/instructors/{instId}:
 *   post:
 *     tags:
 *       - Details of all available courses taught by given instructor
 *     description: All available courses taught by the instructor given by instId
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: instId
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Subject details fetched successfully
 *         schema:
 *           $ref: '#/definition/success'
 *       500:
 *         description: An error occured while processing your request 
 *         schema:
 *           $ref: '#/definition/error'
 */
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

/**
 * @swagger
 * /subjects/classroom/{subname}:
 *   get:
 *     tags:
 *       - Get Subject Details To Arrange A Classroom
 *     description: Fetches all available details for given subject name - subname
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subname
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Subject details fetched successfully
 *         schema:
 *           $ref: '#/definition/success'
 *       500:
 *         description: An error occured while processing your request 
 *         schema:
 *           $ref: '#/definition/error'
 */
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

/**
 * @swagger
 * /subjects/classroomstudents/{subname}:
 *   get:
 *     tags:
 *       - Get Student Details To Arrange A Classroom
 *     description: Fetches all available student details having given subject name - subname
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subname
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Student details fetched successfully
 *         schema:
 *           $ref: '#/definition/success'
 *       500:
 *         description: An error occured while processing your request 
 *         schema:
 *           $ref: '#/definition/error'
 */
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