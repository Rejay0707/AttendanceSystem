// routes/studentRoutes.js
import express from 'express';
import multer from 'multer';
import studentController from '../controllers/studentController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to register a student
router.post('/register', upload.single('face'), studentController.registerStudent);
// Route to get all students
router.get('/', studentController.getAllStudent1);

// Route to verify a student's face
router.post('/verify', studentController.verifyStudent);

export default router;