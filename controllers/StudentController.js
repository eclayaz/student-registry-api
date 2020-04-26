const { validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const Student = require("../models/StudentModel");

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

    const count = await Student.countDocuments({});

    return apiResponse.successResponseWithTotalCount(
      res,
      "Success",
      students,
      count
    );
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
exports.studentStore = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(
      res,
      "Validation Error.",
      errors.array()
    );
  }

  try {
    const student = {
      name: req.body.name,
      gender: req.body.gender,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      subjects: req.body.subjects,
    };

    const newStudent = await Student.create(student);
    return apiResponse.createdResponseWithData(
      res,
      "Student add successfully.",
      newStudent
    );
  } catch (err) {
    return apiResponse.InvalidPayloadResponse(res, err.message);
  }
};

exports.enrollSubjects = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(
      res,
      "Validation Error.",
      errors.array()
    );
  }

  try {
    await Student.updateOne(
      { _id: req.params.id },
      { subjects: req.body.subjects }
    );
    return apiResponse.successResponse(
      res,
      `Student ${req.params.id} enrolled successfully.`
    );
  } catch (err) {
    return apiResponse.InvalidPayloadResponse(res, err.message);
  }
};
