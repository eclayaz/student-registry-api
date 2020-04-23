const { validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const Student = require("../models/StudentModel");

function StudentData(data) {
  this.id = data._id;
  this.name = data.name;
  this.gender = data.gender;
  this.address = data.address;
  this.contactNumber = data.contactNumber;
}

/**
 * @returns {Object}
 */
exports.studentList = function (req, res) {
  const resPerPage = 3;
  const page = req.query.page || 1;

  try {
    Student.find()
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage)
      .then((students) => {
        return apiResponse.successResponseWithData(res, "Success", students);
      });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * @returns {Object}
 */
exports.studentStore = function (req, res) {
  try {
    const errors = validationResult(req);
    var student = new Student({
      name: req.body.name,
      gender: req.body.gender,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
    });

    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(
        res,
        "Validation Error.",
        errors.array()
      );
    } else {
      student.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        let studentData = new StudentData(student);
        return apiResponse.successResponseWithData(
          res,
          "Student add successfully.",
          studentData
        );
      });
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
