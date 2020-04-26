exports.successResponse = function (res, msg) {
  var data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  var resData = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(200).json(resData);
};

exports.successResponseWithTotalCount = function (res, msg, data, count) {
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("X-Total-Count", count);
  return this.successResponseWithData(res, msg, data);
};

exports.createdResponseWithData = function (res, msg, data) {
  var resData = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(201).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg,
  };
  console.log(msg);

  return res.status(500).json(data);
};

exports.InvalidPayloadResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(422).json(data);
};

exports.notFoundResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};
