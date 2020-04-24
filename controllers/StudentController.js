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
exports.studentList = async function (req, res) {
  const page = req.query.page || 1;
  const resPerPage = parseInt(req.query.limit) || 10;

  try {
    const students = await Student.find(
      {},
      "_id name gender address contactNumber subjects"
    )
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);

    const count = await Student.count({});

    return apiResponse.successResponseWithData(res, "Success", students, count);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

/**
 * @returns {Object}
 */
exports.studentDetails = async function (req, res) {
  try {
    const student = await Student.findById(
      req.params.id,
      "_id name gender address contactNumber subjects"
    );
    return apiResponse.successResponseWithData(res, "Success", student);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
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
      subjects: req.body.subjects,
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
