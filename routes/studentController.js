//  @author: Abhishek S
//  Filename: studentController.js
//  This is studentController. It caters to all requests for operations related to student data

var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Get Student Details
 *     description: Fetches all student records
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
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

/**
 * @swagger
 * definition:
 *   error:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 400
 *       message:
 *         type: string
 *       error:
 *         type: string
 *   success:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 200
 *       message:
 *         type: string
 *       data:
 *         type: object
 *   student:
 *     properties:
 *       studentId:
 *         type: string
 *       fname:
 *         type: string
 *       lname:
 *         type: string
 *       age:
 *         type: string
 *       gender:
 *         type: string
 *         enum:
 *          - "Male"
 *          - "Female"
 *       email:
 *         type: string
 *         format: email
 *       phone:
 *         type: string
 *       enrolled:
 *         type: string
 *       advisor:
 *         type: string
 * /students:
 *   post:
 *     tags:
 *       - Add New Student
 *     description:
 *       Add a new student
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: studentId
 *         in: formData
 *         type: string
 *         required: true
 *       - name: fname
 *         in: formData
 *         type: string
 *         required: true   
 *       - name: lname
 *         in: formData
 *         type: string
 *         required: true
 *       - name: age
 *         in: formData
 *         type: string
 *         required: true
 *       - name: gender
 *         in: formData
 *         type: string
 *         enum:
 *           - "Male"
 *           - "Female"
 *         required: true
 *       - name: email
 *         in: formData
 *         type: string
 *         format: email
 *         required: true
 *       - name: phone
 *         in: formData
 *         type: string
 *         required: true
 *       - name: enrolled
 *         in: formData
 *         type: string
 *         required: true
 *       - name: advisor
 *         in: formData
 *         type: string
 *         required: true
 *     responses:
 *       400:
 *         description: Invalid Request. Bad Request Body.
 *         schema:
 *           $ref: '#/definition/error'
 *       200:
 *         description: Student Created Successfully.
 *         schema:
 *           $ref: '#/definition/success'
 *         
 */
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
        && request.body.advisor
        && request.body.subjects) {

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
        studentModel.subjects = request.body.subjects;

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

/**
 * @swagger
 * definition:
 *   error:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 400
 *       message:
 *         type: string
 *       error:
 *         type: string
 *   success:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 200
 *       message:
 *         type: string
 *       data:
 *         type: object
 *   student:
 *     properties:
 *       studentId:
 *         type: string
 * 
 * /students/{studentId}:
 *   post:
 *     tags:
 *       - Find A Student
 *     description:
 *       Find A Student
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: studentId
 *         in: path
 *         type: string
 *         required: true
 * 
 *     responses:
 *       400:
 *         description: Invalid Request. Bad Request Body.
 *         schema:
 *           $ref: '#/definition/error'
 *       200:
 *         description: Student Fetched Successfully.
 *         schema:
 *           $ref: '#/definition/success'
 *         
 */
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

/**
 * @swagger
 * definition:
 *   error:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 400
 *       message:
 *         type: string
 *       error:
 *         type: string
 *   success:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 200
 *       message:
 *         type: string
 *       data:
 *         type: object
 *   student:
 *     properties:
 *       studentId:
 *         type: string
 *       studentFirstName:
 *         type: string
 *       studentLastName:
 *         type: string
 *       studentAge:
 *         type: string
 *       gender:
 *         type: string
 *         enum:
 *          - "Male"
 *          - "Female"
 *       emailAddress:
 *         type: string
 *         format: email
 *       phoneNumber:
 *         type: string
 *       enrolledSemester:
 *         type: string
 *       advisor:
 *         type: string
 * /students:
 *   put:
 *     tags:
 *       - Add New Student
 *     description:
 *       Add a new student
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: studentId
 *         in: formData
 *         type: string
 *         required: true
 *       - name: studentFirstName
 *         in: formData
 *         type: string
 *         required: true   
 *       - name: studentLastName
 *         in: formData
 *         type: string
 *         required: true
 *       - name: studentAge
 *         in: formData
 *         type: string
 *         required: true
 *       - name: gender
 *         in: formData
 *         type: string
 *         enum:
 *           - "Male"
 *           - "Female"
 *         required: true
 *       - name: emailAddress
 *         in: formData
 *         type: string
 *         format: email
 *         required: true
 *       - name: phoneNumber
 *         in: formData
 *         type: string
 *         required: true
 *       - name: enrolledSemester
 *         in: formData
 *         type: string
 *         required: true
 *       - name: advisor
 *         in: formData
 *         type: string
 *         required: true
 *     responses:
 *       400:
 *         description: Invalid Request. Bad Request Body.
 *         schema:
 *           $ref: '#/definition/error'
 *       200:
 *         description: Student Created Successfully.
 *         schema:
 *           $ref: '#/definition/success'
 *         
 */
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

/**
 * @swagger
 * definition:
 *   error:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 400
 *       message:
 *         type: string
 *       error:
 *         type: string
 *   success:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 200
 *       message:
 *         type: string
 *       data:
 *         type: object
 *   student:
 *     properties:
 *       advisorUpdate:
 *         type: string
 *       enrollUpdate:
 *         type: string
 * 
 * /students:
 *   patch:
 *     tags:
 *       - Update A Student
 *     description:
 *       Update A Student
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: advisorUpdate
 *         in: formData
 *         type: string
 *         required: false
 *       - name: enrollUpdate
 *         in: formData
 *         type: string
 *         required: false
 * 
 *     responses:
 *       400:
 *         description: Invalid Request. Bad Request Body.
 *         schema:
 *           $ref: '#/definition/error'
 *       200:
 *         description: Student Updated Successfully.
 *         schema:
 *           $ref: '#/definition/success'
 *         
 */
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

/**
 * @swagger
 * definition:
 *   error:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 400
 *       message:
 *         type: string
 *       error:
 *         type: string
 *   success:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 200
 *       message:
 *         type: string
 *       data:
 *         type: object
 *   student:
 *     properties:
 *       studentId:
 *         type: string
 * 
 * /students/{studentId}:
 *   delete:
 *     tags:
 *       - Delete A Student
 *     description:
 *       Delete A Student
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: studentId
 *         in: path
 *         type: string
 *         required: true
 * 
 *     responses:
 *       400:
 *         description: Invalid Request. Bad Request Body.
 *         schema:
 *           $ref: '#/definition/error'
 *       200:
 *         description: Student Deleted Successfully.
 *         schema:
 *           $ref: '#/definition/success'
 *         
 */
router.delete('/:studentId', function (request, response) {
    collection.deleteOne({ "_id": request.params.studentId });
    response.status(200).end("Successfully Deleted Student");
});

router.get('/max', function (request, response) {
    collection.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).toArray(function (err, result) {
        if (err) {
            console.log("Error occured : " + err);
            response.setHeader('Content-Type', 'application/json');
            response.status(500).end(JSON.stringify({ "errorMessage": "An error occured while processing your request" }));
        }
        console.log(JSON.stringify(result));
        response.setHeader('Content-Type', 'application/json');
        response.status(200).end(JSON.stringify(result));
    });
});

module.exports = router;