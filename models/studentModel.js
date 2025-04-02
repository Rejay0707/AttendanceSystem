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

// Function to register a student
const registerStudent = async (name, roll_no, face_data) => {
    const capture_date_time = new Date(); // Get the current date and time
    const result = await pool.query(
        'INSERT INTO students (name, roll_no, face_data, capture_date_time) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, roll_no, face_data, capture_date_time]
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

export default { registerStudent, getAllStudents };