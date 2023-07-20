import express from 'express';
import Exam from '../../models/Exam.js';

const examController = {
  // Endpoint: Tạo đề thi mới
  createExam: async (req, res) => {
    try {
      const { examID, subject, createdBy, isPrivate, title, type, link, examDate, duration, minScore, questionsList } = req.body;
      const newExam = new Exam({
        examID,
        subject,
        createdBy,
        isPrivate,
        title,
        type,
        link,
        examDate,
        duration,
        minScore,
        questionsList
      });

      const savedExam = await newExam.save();
      res.status(201).json(savedExam);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Endpoint: Sửa đề thi
  editExam: async (req, res) => {
    try {
      const examID = req.params.examID;
      const updatedExam = await Exam.findByIdAndUpdate(examID, req.body, { new: true });
      res.status(200).json(updatedExam);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Endpoint: Tìm đề thi theo người tạo
  findExamsByCreatedBy: async (req, res) => {
    try {
      const createdBy = req.params.createdBy;
      console.log(createdBy)
      const exams = await Exam.find({ createdBy });
      console.log(exams)
      res.status(200).json(exams);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Endpoint: Xóa đề thi
  deleteExam: async (req, res) => {
    try {
      const examID = req.params.examID;
      await Exam.findByIdAndRemove(examID);
      res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Endpoint: Chia sẻ đề thi cho người khác (Clone đề thi)
  shareExam: async (req, res) => {
    try {
      const examID = req.params.examID;
      const examToShare = await Exam.findById(examID).populate('questionsList').exec();
      const clonedExam = { ...examToShare.toObject(), _id: null, createdBy: req.body.sharedBy, examID: null };

      const savedExam = await new Exam(clonedExam).save();
      res.status(201).json(savedExam);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export default examController;
