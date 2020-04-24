const apiResponse = require("../helpers/apiResponse");
const Subject = require("../models/SubjectModel");

/**
 * @returns {Object}
 */
exports.subjectList = async function (req, res) {
  try {
    const subject = await Subject.find({}, "_id name");

    return apiResponse.successResponseWithData(res, "Success", subject);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
