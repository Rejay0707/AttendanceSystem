// models/teacherModel.js
import pool from '../config/db.js';

const getAllTeachers = async () => {
    const result = await pool.query('SELECT * FROM teachers');
    return result.rows;
};

const registerTeacher = async (name, subject, grades) => {
    const result = await pool.query(
        'INSERT INTO teachers (name, subject, grades) VALUES ($1, $2, $3) RETURNING *',
        [name, subject, grades]
    );
    return result.rows[0];
};

export default {
    getAllTeachers,
    registerTeacher,
};
