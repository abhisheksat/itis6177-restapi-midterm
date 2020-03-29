var subject, instructor;

var subject = function (subject, instructor) {
    var subjectModel = {
        subject: subject,
        instructor: instructor
    };
    return subjectModel;
};

module.exports.subject = subject;