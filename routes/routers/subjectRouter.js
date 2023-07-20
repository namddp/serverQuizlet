import express from "express" ;
import subjectController  from "../controllers/subjectController.js";
const subjectRouter = express.router()
// Endpoint: Tạo mới môn học
subjectRouter.post("/createSubject", subjectController.createSubject);

// Endpoint: Sửa thông tin môn học
subjectRouter.put("/editSubject/:subjectID", subjectController.editSubject);

// Endpoint: Xóa môn học
subjectRouter.delete("/deleteSubject/:subjectID", subjectController.deleteSubject);

export default subjectRouter
