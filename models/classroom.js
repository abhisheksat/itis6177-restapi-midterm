//  @author: Abhishek S
//  Filename: classroom.js
//  This is classroom model, used to display classroom arrangement

var subject, instructor, studs;

var classroom = function (subject, instructor, studs) {
    var classroomModel = {
        subject: subject,
        instructor: instructor,
        studs: studs
    };
    return classroomModel;
};

module.exports.classroom = classroom;