// controllers/teacherController.js
import teacherService from '../services/teacherService.js';

const registerTeacher = async (req, res) => {
    const { name, subject, selectedGrades } = req.body;

    try {
        const newTeacher = await teacherService.registerTeacher(name, subject, selectedGrades);
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error registering teacher:', error);
        res.status(500).json({ message: 'Teacher registration failed', error: error.message });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Failed to fetch teachers', error: error.message });
    }
};

export default {
    registerTeacher,
    getAllTeachers,
};
