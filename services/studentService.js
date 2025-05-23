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



const registerStudent = async (name, roll_no, face_data, grade, phone_number) => {
    const capture_date_time = new Date();
    const existingStudent = await studentModel.getStudentByRollNoAndDate(roll_no, capture_date_time);

    if (existingStudent) {
        return existingStudent;
    } else {
        return await studentModel.registerStudent(name, roll_no, face_data, grade, phone_number, capture_date_time);
    }
};




const getAllStudents = async (date) => {
    try {
        const result = await studentModel.getAllStudents(); // Fetch all students from the model

        // Filter and aggregate attendance data
        const filteredStudents = result.filter(student => {
            const studentDate = new Date(student.capture_date_time).toISOString().split('T')[0];
            return !date || studentDate === date;
        });

        // Aggregate attendance data
        const studentMap = {};
        filteredStudents.forEach(student => {
            const key = `${student.roll_no}-${new Date(student.capture_date_time).toISOString().split('T')[0]}`;
            if (!studentMap[key]) {
                studentMap[key] = {
                    name: student.name,
                    roll_no: student.roll_no,
                    morning_present: student.morning_present,
                    afternoon_present: student.afternoon_present,
                    capture_date_time: student.capture_date_time,
                };
            } else {
                studentMap[key].morning_present = studentMap[key].morning_present || student.morning_present;
                studentMap[key].afternoon_present = studentMap[key].afternoon_present || student.afternoon_present;
            }
        });

        return Object.values(studentMap);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};





export default {
    registerStudent,
    getAllStudents,
};