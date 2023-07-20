import express from "express" ;
import searchController from "../controllers/searchController.js";
const searchRouter = express.router()


// Endpoint: Tìm kiếm môn học
searchRouter.get("/searchSubjects", searchController.searchSubjects);

// Endpoint: Tìm kiếm câu hỏi
searchRouter.get("/searchQuestions", searchController.searchQuestions);

// Endpoint: Tìm kiếm đề thi
searchRouter.get("/searchExams", searchController.searchExams);

export default searchRouter
