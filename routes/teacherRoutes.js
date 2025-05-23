// routes/teacherRoutes.js
import express from 'express';
import teacherController from '../controllers/teacherController.js';

const router = express.Router();

// Route to register a teacher
router.post('/register', teacherController.registerTeacher);

// Route to get all teachers
router.get('/', teacherController.getAllTeachers);

export default router;
