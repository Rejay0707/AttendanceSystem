import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// student routes
app.use('/api/students', studentRoutes);
// app.use('/api/students', studentController.getAllStudents);

//Auth routes
app.use('/api/auth', authRoutes);

//teacher routes
app.use('/api/teachers', teacherRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});