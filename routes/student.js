var express = require("express");
const StudentController = require("../controllers/StudentController");

var router = express.Router();

router.get("/:page?", StudentController.studentList);
// router.get("/students/:id", StudentController.getOne);
router.post("/", StudentController.studentStore);

module.exports = router;
