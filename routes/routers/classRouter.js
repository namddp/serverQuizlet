const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

// Endpoint: Tạo mới lớp
router.post("/createClass", classController.createClass);

// Endpoint: Sửa thông tin lớp
router.put("/editClass/:classID", classController.editClass);

// Endpoint: Mời học sinh vào lớp
router.put("/inviteStudent/:classID", classController.inviteStudent);

// Endpoint: Xóa học sinh khỏi lớp
router.put("/removeStudent/:classID", classController.removeStudent);

// Endpoint: Xóa lớp
router.delete("/deleteClass/:classID", classController.deleteClass);

module.exports = router;
