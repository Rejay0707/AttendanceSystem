import studentService from '../services/studentService.js';
import { createCanvas, loadImage } from 'canvas';
import { compareFaces } from '../utils/faceRecognition.js';
import pool from '../config/db.js';


const registerStudent = async (req, res) => {
    try {
        const { name, roll_no } = req.body;
        const faceFile = req.file;

        if (!faceFile) {
            return res.status(400).json({ message: 'Face image is required' });
        }

        const face_data = faceFile.buffer; // Store raw binary or base64 if needed
        const capture_date_time = new Date();
        const hour = capture_date_time.getHours();

        const morning_present = hour < 12;
        const afternoon_present = !morning_present;

        const result = await pool.query(
            `INSERT INTO students (name, roll_no, face_data, capture_date_time, morning_present, afternoon_present) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, roll_no, face_data, capture_date_time, morning_present, afternoon_present]
        );

        // Only return the row, not the full result object (avoids circular reference)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting student:', error.message);
        res.status(500).json({ message: 'Student registration failed', error: error.message });
    }
};

const verifyStudent = async (req, res) => {
    const { image } = req.body; // Base64 image data

    try {
        const base64Image = image.split(';base64,').pop();
        const imgBuffer = Buffer.from(base64Image, 'base64');

        const img = await loadImage(imgBuffer);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const capturedImageData = ctx.getImageData(0, 0, img.width, img.height);

        const students = await studentService.getAllStudents();

        for (const student of students) {
            const storedFaceData = student.face_data;

            const isMatch = await compareFaces(capturedImageData, storedFaceData);

            if (isMatch) {
                return res.status(200).json({ message: 'Student verified', student });
            }
        }

        return res.status(404).json({ message: 'Student not recognized' });
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ error: 'Verification failed' });
    }
};

const getAllStudent1 = async (req, res) => {
    try {
        const { date } = req.query; // 👈 get date from query
        const students = await studentService.getAllStudents(date); // 👈 pass it to the service
        res.status(200).json(students);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};





export default {
    registerStudent,
    verifyStudent,
    getAllStudent1,
};
