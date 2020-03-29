//  @author: Abhishek S
//  Filename: instructor.js
//  This is instructor model, used to collect and display instructors

var instructor, subCount;

var instructor = function (instructor, subCount) {
    var instructorModel = {
        instructor: instructor,
        subCount: subCount
    };
    return instructorModel;
};

module.exports.instructor = instructor;