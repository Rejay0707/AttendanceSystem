import studentModel from '../models/studentModel.js';
import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres', //PostgreSQL username
    host: 'localhost',
    database: 'attendanceDB', //database name
    password: 'Rejaysobis@7397702155', //PostgreSQL password
    port: 5432,
});


// Service to register a student
const registerStudent = async (name, roll_no, face_data) => {
    return await studentModel.registerStudent(name, roll_no, face_data);
};

// Service to get all students
// const getAllStudents = async () => {
//     return await studentModel.getAllStudents();
// };
const getAllStudents = async () => {
    try {
        const result = await pool.query('SELECT name, roll_no, capture_date_time, morning_present, afternoon_present FROM students');
        const currentHour = new Date().getHours();

        const studentsWithSessionStatus = result.rows.map(student => {
            const captureDate = new Date(student.capture_date_time); // Create a Date object
            const formattedDate = captureDate.toLocaleDateString(); // Format date to a readable format

            // Determine attendance status
            const morningPresent = student.morning_present || (currentHour < 12 && captureDate.getHours() < 12);
            const afternoonPresent = student.afternoon_present || (currentHour >= 12 && captureDate.getHours() >= 12);

            return {
                ...student,
                formattedDate, // Add the formatted date to the student object
                morning_present: morningPresent,
                afternoon_present: afternoonPresent,
            };
        });

        return studentsWithSessionStatus;
    } catch (error) {
        console.error('Error getting all students:', error);
        throw error;
    }
};

export default {
    registerStudent,
    getAllStudents,
};