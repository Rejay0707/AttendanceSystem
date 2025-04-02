import studentService from '../services/studentService.js';
import { createCanvas, loadImage } from 'canvas';
import { compareFaces } from '../utils/faceRecognition.js';


// const registerStudent = async (req, res) => {
//     const { name, roll_no } = req.body;
//     const face_data = req.file.buffer; // Get the face image data

//     try {
//         const student = await studentService.registerStudent(name, roll_no, face_data);
//         res.status(201).json(student); // This will now include capture_date_time
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to register student' });
//     }
// };

const registerStudent = async (name, roll_no, face_data) => {
    const capture_date_time = new Date(); // Get the current date and time
    const hour = capture_date_time.getHours();
    let morning_present = false;
    let afternoon_present = false;

    // Determine if it's morning or afternoon
    if (hour < 12) {
        morning_present = true; // Mark as present in the morning
        afternoon_present = false; // Set afternoon to false since it's not yet registered
    } else {
        morning_present = false; // Morning session is over
        afternoon_present = true; // Mark as present in the afternoon
    }

    const result = await pool.query(
        'INSERT INTO students (name, roll_no, face_data, capture_date_time, morning_present, afternoon_present) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, roll_no, face_data, capture_date_time, morning_present, afternoon_present]
    );
    return result.rows[0];
};

// Other functions remain unchanged

const verifyStudent = async (req, res) => {
    const { image } = req.body; // Base64 image data

    try {
        // Decode the base64 image
        const base64Image = image.split(';base64,').pop();
        const imgBuffer = Buffer.from(base64Image, 'base64');

        // Load the captured image
        const img = await loadImage(imgBuffer);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Get the image data for comparison
        const capturedImageData = ctx.getImageData(0, 0, img.width, img.height);

        // Retrieve all students' face data from the database
        const students = await studentService.getAllStudents();

        // Compare the captured image with each student's face data
        for (const student of students) {
            const storedFaceData = student.face_data; // Assuming this is in a comparable format

            // Use a utility function to compare faces
            const isMatch = await compareFaces(capturedImageData, storedFaceData);

            if (isMatch) {
                return res.status(200).json({ message: 'Student verified', student });
            }
        }

        return res.status(404).json({ message: 'Student not recognized' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Verification failed' });
    }
};

const getAllStudent1 = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

export default {
    registerStudent,
    verifyStudent,
    getAllStudent1,
};