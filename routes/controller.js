var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/scripts/app.js', function (request, response) {
    const readStream = fs.createReadStream('./scripts/app.js');
    response.writeHead(200, { 'Content-type': 'text/javascript' });
    readStream.pipe(response);
});

router.get('/scripts/angularcontroller.js', function (request, response) {
    const readStream = fs.createReadStream('./scripts/angularcontroller.js');
    response.writeHead(200, { 'Content-type': 'text/javascript' });
    readStream.pipe(response);
});

router.get('/', function (request, response) {
    const readStream = fs.createReadStream('./views/index.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/main', function (request, response) {
    const readStream = fs.createReadStream('./views/main.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/addNewStudent', function (request, response) {
    const readStream = fs.createReadStream('./views/addNewStudent.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/updateStudentDetails', function (request, response) {
    const readStream = fs.createReadStream('./views/updateStudentDetails.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/editStudentDetails', function (request, response) {
    const readStream = fs.createReadStream('./views/editStudentDetails.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/changeAdvisor', function (request, response) {
    const readStream = fs.createReadStream('./views/changeAdvisor.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/changeEnrolledSemester', function (request, response) {
    const readStream = fs.createReadStream('./views/changeEnrolledSemester.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/updateAdvisor', function (request, response) {
    const readStream = fs.createReadStream('./views/updateAdvisor.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/updateEnrolledSemester', function (request, response) {
    const readStream = fs.createReadStream('./views/updateEnrolledSemester.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/subjectByName', function (request, response) {
    const readStream = fs.createReadStream('./views/subjectByName.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/subjectByInstructor', function (request, response) {
    const readStream = fs.createReadStream('./views/subjectByInstructor.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/addNewSubject', function (request, response) {
    const readStream = fs.createReadStream('./views/addNewSubject.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/subjectwiseClassroom', function (request, response) {
    const readStream = fs.createReadStream('./views/subjectwiseClassroom.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/instSubjects', function (request, response) {
    const readStream = fs.createReadStream('./views/instSubjects.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/deleteStudent', function (request, response) {
    const readStream = fs.createReadStream('./views/deleteStudent.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

router.get('/classroom', function (request, response) {
    const readStream = fs.createReadStream('./views/classroom.html');
    response.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(response);
});

module.exports = router;