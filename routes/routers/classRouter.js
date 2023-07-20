import express from "express";
import classController from "../controllers/classController.js";
const classRouter = express.Router();

// Endpoint: Tạo mới lớp
classRouter.post("/createClass", classController.createClass);

// Endpoint: Sửa thông tin lớp
classRouter.put("/editClass/:classID", classController.editClass);

// Endpoint: Mời học sinh vào lớp
classRouter.put("/inviteStudent/:classID", classController.inviteStudent);

// Endpoint: Xóa học sinh khỏi lớp
classRouter.put("/removeStudent/:classID", classController.removeStudent);

// Endpoint: Xóa lớp
classRouter.delete("/deleteClass/:classID", classController.deleteClass);

export default classRouter
