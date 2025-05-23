import pool from '../config/db.js';



const getStudentByRollNoAndDate = async (roll_no, capture_date_time) => {
    const date = new Date(capture_date_time).toISOString().split('T')[0];
    const result = await pool.query(
        'SELECT * FROM students WHERE roll_no = $1 AND DATE(capture_date_time) = $2',
        [roll_no, date]
    );
    return result.rows[0]; // Assuming only one record per day per student
};

const registerStudent = async (name, roll_no, face_data, grade, phone_number, capture_date_time) => {
    const result = await pool.query(
        `INSERT INTO students (name, roll_no, face_data, capture_date_time, grade, phone_number)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, roll_no, face_data, capture_date_time, grade, phone_number]
    );
    return result.rows[0];
};


// Function to get all students
const getAllStudents = async () => {
    try {
        const result = await pool.query('SELECT * FROM students');
        return result.rows;
    } catch (error) {
        console.error('Error getting all students:', error);
        throw error;
    }
};



export default {getStudentByRollNoAndDate, registerStudent, getAllStudents };
