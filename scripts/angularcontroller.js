app.controller("HttpGetController", function ($scope, $http, $window) {

    $scope.test = "This is Test Data";

    $scope.classroom = {};

    $scope.red = function () {
        $window.location.href = "#!index";
    }

    $scope.GetClassroom = function (subname) {
        alert(subname);
        $http.get('http://localhost:3000/api/v1/subjects/classroom/' + subname)
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    console.log(response.data);
                    $scope.classroom = response.data;

                    $http.get('http://localhost:3000/api/v1/subjects/classroomstudents/' + subname)
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

    $scope.getInstructorSubjects = function (instructor) {
        alert(instructor);
        $http.post('http://localhost:3000/api/v1/subjects/instructors/' + instructor)
            .then(function (response) {
                if (response.data && response.status == 200) {
                    $scope.instructorSubs = response.data;
                    $window.location.href = "#!instSubjects";
                } else {
                    alert("User data does not exists");
                }
            });
    }

    $scope.GetAllInstructorData = function () {
        $http.get('http://localhost:3000/api/v1/subjects/instructors')
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

    $scope.GetAllSubjectData = function () {
        $http.get('http://localhost:3000/api/v1/subjects')
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

    $scope.deleteStudent = function (studentId) {

        var choice = confirm('Are you sure you want to delete the user?');

        if (choice == true) {
            $http.delete('http://localhost:3000/api/v1/students/' + studentId)
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

    $scope.updateEnrolledSemester = function (updateEnrollmentData) {
        console.log(updateEnrollmentData);

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.patch('http://localhost:3000/api/v1/students', updateEnrollmentData, config)
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                $window.location.href = "#!changeEnrolledSemester";
            });
    };

    $scope.updateAdvisor = function (updateAdvisorData) {
        console.log(updateAdvisorData);

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.patch('http://localhost:3000/api/v1/students', updateAdvisorData, config)
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                $window.location.href = "#!changeAdvisor";
            });
    };

    $scope.updateStudentEnrollment = function (studentId) {
        $http.post('http://localhost:3000/api/v1/students/' + studentId)
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

    $scope.updateStudentAdvisor = function (studentId) {
        $http.post('http://localhost:3000/api/v1/students/' + studentId)
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

    $scope.EditStudentDetails = function (dataEdit) {
        console.log("New Data is : " + JSON.stringify(dataEdit));

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.put('http://localhost:3000/api/v1/students', dataEdit, config)
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                $window.location.href = "#!updateStudentDetails";
            });
    };

    $scope.updateStudent = function (data) {
        alert(data);
        $http.post('http://localhost:3000/api/v1/students/' + data)
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

    $scope.GetAllData = function () {
        $http.get('http://localhost:3000/api/v1/students')
            .then(function (response) {
                console.log(response.data);
                $scope.studentDetails = response.data;
            });
    };

    $scope.CreateNewStudent = function (data) {
        console.log("Test : " + JSON.stringify(data));
        console.log("Student Data : " + JSON.stringify($scope.studentData));

        $scope.studentData = data;

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.post('http://localhost:3000/api/v1/students', $scope.studentData, config)
            .then(function (response) {
                console.log("Resp : " + response.data);
                // $scope.Details = response.data;
                if (response.status == 201) {
                    alert('Student Saved Successfully!');
                    $scope.studentData = {};
                    $window.location.href = "#!index";
                } else {
                    alert('Student Creation Failed');
                }
            });
    };

    /*
    $scope.GetAllData = function () {

        var data = $.param({
            driveid: $scope.drive_id
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('http://localhost:8081/api/v1/donorDetailsForNurse', data, config)
            .then(function (response) {
                console.log(response.data);
                $scope.Details = response.data;
            });
    };
    */
});