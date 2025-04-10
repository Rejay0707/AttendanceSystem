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



const getAllStudents = async (date) => {
    try {
        const result = await pool.query('SELECT name, roll_no, capture_date_time, morning_present, afternoon_present, face_data FROM students');

        const filteredStudents = result.rows.filter(student => {
            const studentDate = new Date(student.capture_date_time).toISOString().split('T')[0];
            return !date || studentDate === date;
        });

        return filteredStudents;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};



export default {
    registerStudent,
    getAllStudents,
};