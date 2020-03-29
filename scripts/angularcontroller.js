//  @author: Abhishek S
//  Filename: angularcontroller.js
//  This is angularcontroller.
//  Handles data on $scope, core of the AngularJS SPA, connects to the API using $http.

app.controller("HttpGetController", function ($scope, $http, $window) {

    $scope.classroom = {};
    $scope.selected = [];

    $scope.getMax = function () {
        $http.get('http://159.65.32.96:3000/api/v1/students/max')
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    $scope.max = (parseInt(response.data[0]._id) + 1);
                } else {
                    console.log("No Subject Data Found");
                    alert('No Subject Data Found');
                }
            });
    }

    //  Check if a subject is already present
    $scope.exists = function (subject) {
        return $scope.selected.indexOf(subject) > -1;
    };

    //  Add/Remove subject in the selected model
    $scope.toggleSelect = function (subject) {
        var index = $scope.selected.indexOf(subject);
        if (index > -1) {
            $scope.selected.splice(index, 1);
        } else {
            $scope.selected.push(subject);
        }
    };

    //  Create a classroom for given subject - subname
    $scope.GetClassroom = function (subname) {
        $http.get('http://159.65.32.96:3000/api/v1/subjects/classroom/' + subname)
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    console.log(response.data);
                    $scope.classroom = response.data;

                    $http.get('http://159.65.32.96:3000/api/v1/subjects/classroomstudents/' + subname)
                        .then(function (response) {
                            if (response.status == 200 && response.data) {
                                $scope.classroom.studs = response.data;
                                console.log($scope.classroom);
                                $window.location.href = "#!classroom";
                            }
                        });
                } else {
                    console.log("No Subject Data Found");
                    alert('No Subject Data Found');
                }
            });
    }

    //  For a given instructor, receive subjects taught
    $scope.getInstructorSubjects = function (instructor) {
        alert(instructor);
        $http.post('http://159.65.32.96:3000/api/v1/subjects/instructors/' + instructor)
            .then(function (response) {
                if (response.data && response.status == 200) {
                    $scope.instructorSubs = response.data;
                    $window.location.href = "#!instSubjects";
                } else {
                    alert("User data does not exists");
                }
            });
    }

    //  Get Instructors and number of subjects taught
    $scope.GetAllInstructorData = function () {
        $http.get('http://159.65.32.96:3000/api/v1/subjects/instructors')
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    console.log(response.data);
                    $scope.instructorDetails = response.data;
                } else {
                    console.log("No Subject Data Found");
                    alert('No Subject Data Found');
                }
            });
    }

    //  Get all subject details
    $scope.GetAllSubjectData = function () {
        $http.get('http://159.65.32.96:3000/api/v1/subjects')
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    console.log(response.data);
                    $scope.subjectDetails = response.data;
                } else {
                    console.log("No Subject Data Found");
                    alert('No Subject Data Found');
                }
            });
    }

    //  Delete a student with given studentId
    $scope.deleteStudent = function (studentId) {

        var choice = confirm('Are you sure you want to delete the user?');

        if (choice == true) {
            $http.delete('http://159.65.32.96:3000/api/v1/students/' + studentId)
                .then(function (response) {
                    if (response.data && response.status == 200) {
                        alert('Student Deleted Successfully');
                        $window.location.href = "#!deleteStudent";
                    } else {
                        alert("User data does not exists");
                    }
                });
        }
    };

    //  Update the Enrolled Semester data for the given student
    $scope.updateEnrolledSemester = function (updateEnrollmentData) {
        console.log(updateEnrollmentData);

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.patch('http://159.65.32.96:3000/api/v1/students', updateEnrollmentData, config)
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                $window.location.href = "#!changeEnrolledSemester";
            });
    };

    //  Update advisor data for given student
    $scope.updateAdvisor = function (updateAdvisorData) {
        console.log(updateAdvisorData);

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.patch('http://159.65.32.96:3000/api/v1/students', updateAdvisorData, config)
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                $window.location.href = "#!changeAdvisor";
            });
    };

    //  Update Student Enrollment, fetch and prepopulate details
    $scope.updateStudentEnrollment = function (studentId) {
        $http.post('http://159.65.32.96:3000/api/v1/students/' + studentId)
            .then(function (response) {
                if (response.data[0] && response.status == 200) {
                    console.log("RESP : " + JSON.stringify(response.data[0]));
                    $scope.studentEnrollmentData = response.data[0];
                    $scope.studentEnrollmentData.enrollUpdate = "enrollUpdate";
                    console.log("Param : " + JSON.stringify($scope.studentEnrollmentData));
                    $window.location.href = "#!updateEnrolledSemester";
                } else {
                    alert("User data does not exists");
                }
            });
    };

    //  Update Student Enrollment, fetch and prepopulate details
    $scope.updateStudentAdvisor = function (studentId) {
        $http.post('http://159.65.32.96:3000/api/v1/students/' + studentId)
            .then(function (response) {
                if (response.data[0] && response.status == 200) {
                    console.log(response.data[0]);
                    $scope.studentDataUpdate = response.data[0];
                    $scope.studentDataUpdate.advisorUpdate = "advisorUpdate";
                    console.log("Param : " + JSON.stringify($scope.studentDataUpdate));
                    $window.location.href = "#!updateAdvisor";
                } else {
                    alert("User data does not exists");
                }
            });
    };

    //  Update / Replace student object, all details updated / replaced
    $scope.EditStudentDetails = function (dataEdit) {
        console.log("New Data is : " + JSON.stringify(dataEdit));

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.put('http://159.65.32.96:3000/api/v1/students', dataEdit, config)
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                $window.location.href = "#!updateStudentDetails";
            });
    };

    //  Get Student details and prepopulate to update
    $scope.updateStudent = function (data) {
        $http.post('http://159.65.32.96:3000/api/v1/students/' + data)
            .then(function (response) {
                if (response.data[0] && response.status == 200) {
                    console.log(response.data[0]);
                    $scope.studentDataEdit = response.data[0];
                    $window.location.href = "#!editStudentDetails";
                } else {
                    alert("User data does not exists");
                }
            });
    };

    //  Get All Student Details
    $scope.GetAllData = function () {
        $http.get('http://159.65.32.96:3000/api/v1/students')
            .then(function (response) {
                console.log(response.data);
                $scope.studentDetails = response.data;
            });
    };

    //  Add a new student to the database
    $scope.CreateNewStudent = function (data, subs, max) {
        console.log("Test : " + JSON.stringify(data));
        console.log("Test : " + JSON.stringify(subs));
        console.log("Student Data : " + JSON.stringify($scope.studentData));

        $scope.studentData = data;
        $scope.studentData.studentId = max.toString();
        $scope.studentData.subjects = subs;

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.post('http://159.65.32.96:3000/api/v1/students', $scope.studentData, config)
            .then(function (response) {
                console.log("Resp : " + response.data);
                if (response.status == 201) {
                    alert('Student Saved Successfully!');
                    $scope.studentData = {};
                    $scope.selected = [];
                    $window.location.href = "#!index";
                } else {
                    alert('Student Creation Failed');
                }
            });
    };
});