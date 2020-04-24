const apiResponse = require("../helpers/apiResponse");
const Subject = require("../models/SubjectModel");

/**
 * @returns {Object}
 */
exports.subjectList = async function (req, res) {
  try {
    const subjects = await Subject.find({}, "_id name");

    return apiResponse.successResponseWithData(res, "Success", subjects);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
