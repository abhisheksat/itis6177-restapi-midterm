//  @author: Abhishek S
//  Filename: subject.js
//  This is subjec model, used to collect and display subject details

var subject, instructor;

var subject = function (subject, instructor) {
    var subjectModel = {
        subject: subject,
        instructor: instructor
    };
    return subjectModel;
};

module.exports.subject = subject;