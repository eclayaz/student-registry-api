var express = require("express");
const SubjectController = require("../controllers/SubjectController");

var router = express.Router();

router.get("/", SubjectController.subjectList);

module.exports = router;
