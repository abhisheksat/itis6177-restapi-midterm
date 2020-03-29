var app = angular.module("app", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/main"
        })
        .when("/index", {
            templateUrl: "/main"
        })
        .when("/addNewStudent", {
            templateUrl: "/addNewStudent"
        })
        .when("/updateStudentDetails", {
            templateUrl: "/updateStudentDetails"
        })
        .when("/editStudentDetails", {
            templateUrl: "/editStudentDetails"
        })
        .when("/changeAdvisor", {
            templateUrl: "/changeAdvisor"
        })
        .when("/changeEnrolledSemester", {
            templateUrl: "/changeEnrolledSemester"
        })
        .when("/updateAdvisor", {
            templateUrl: "/updateAdvisor"
        })
        .when("/updateEnrolledSemester", {
            templateUrl: "/updateEnrolledSemester"
        })
        .when("/subjectByName", {
            templateUrl: "/subjectByName"
        })
        .when("/subjectByInstructor", {
            templateUrl: "/subjectByInstructor"
        })
        .when("/subjectwiseClassroom", {
            templateUrl: "/subjectwiseClassroom"
        })
        .when("/instSubjects", {
            templateUrl: "/instSubjects"
        })
        .when("/classroom", {
            templateUrl: "/classroom"
        })
        .when("/deleteStudent", {
            templateUrl: "/deleteStudent"
        });
});