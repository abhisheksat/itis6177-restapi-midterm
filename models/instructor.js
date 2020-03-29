var instructor, subCount;

var instructor = function (instructor, subCount) {
    var instructorModel = {
        instructor: instructor,
        subCount: subCount
    };
    return instructorModel;
};

module.exports.instructor = instructor;