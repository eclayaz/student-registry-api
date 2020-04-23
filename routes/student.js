var express = require("express");
const StudentController = require("../controllers/StudentController");

var router = express.Router();

router.get("/:id", StudentController.studentDetails);
router.get("/:page?", StudentController.studentList);
router.post("/", StudentController.studentStore);

module.exports = router;
