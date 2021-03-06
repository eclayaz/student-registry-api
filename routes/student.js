var express = require("express");
const StudentController = require("../controllers/StudentController");

var router = express.Router();

router.get("/:id", StudentController.studentDetails);
router.get("/:page?:limit?", StudentController.studentList);
router.post("/", StudentController.studentStore);
router.put("/:id/subjects", StudentController.enrollSubjects);

module.exports = router;
