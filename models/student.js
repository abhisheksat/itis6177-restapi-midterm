//  @author: Abhishek S
//  Filename: student.js
//  This is student model, used to collect and display student details

var studentId, studentFirstName, studentLastName, studentAge, gender, emailAddress, phoneNumber, enrolledSemester, advisor, subjects;

var student = function (studentId, studentFirstName, studentLastName, studentAge, gender, emailAddress, phoneNumber, enrolledSemester, advisor, subjects) {
    var studentModel = {
        studentId: studentId,
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
        studentAge: studentAge,
        gender: gender,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        enrolledSemester: enrolledSemester,
        advisor: advisor,
        subjects: subjects
    };
    return studentModel
};

module.exports.student = student;