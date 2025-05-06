import pool from '../config/db.js';


// Function to register a student


const registerStudent = async (name, roll_no, face_data) => {
    const capture_date_time = new Date(); // Get the current date and time

    // Check if the student already exists for today
    const existingStudent = await pool.query(
        'SELECT * FROM students WHERE roll_no = $1 AND DATE(capture_date_time) = CURRENT_DATE',
        [roll_no]
    );

    if (existingStudent.rows.length > 0) {
        // Update the existing student's afternoon status
        const updatedStudent = await pool.query(
            'UPDATE students SET afternoon_present = TRUE WHERE roll_no = $1 AND DATE(capture_date_time) = CURRENT_DATE RETURNING *',
            [roll_no]
        );
        return updatedStudent.rows[0];
    } else {
        // Register a new student
        const result = await pool.query(
            'INSERT INTO students (name, roll_no, face_data, capture_date_time, morning_present, afternoon_present) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, roll_no, face_data, capture_date_time, true, false] // Mark morning as present, afternoon as absent
        );
        return result.rows[0];
    }
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



export default { registerStudent, getAllStudents };
