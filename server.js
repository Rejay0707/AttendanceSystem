import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use student routes
app.use('/api/students', studentRoutes);
// app.use('/api/students', studentController.getAllStudents);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});