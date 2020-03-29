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