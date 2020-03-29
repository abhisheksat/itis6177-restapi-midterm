//  @author: Abhishek S
//  Filename: classroomstudents.js
//  This is classroomstudents model, used to collect students in a classroom

var studentId, studentFirstName, studentLastName, emailAddress, enrolledSemester;

var student = function (studentId, studentFirstName, studentLastName, emailAddress, enrolledSemester) {
    var studentModel = {
        studentId: studentId,
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
        emailAddress: emailAddress,
        enrolledSemester: enrolledSemester
    };
    return studentModel
};

module.exports.student = student;