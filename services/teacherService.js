// services/teacherService.js
import teacherModel from '../models/teacherModel.js';

const getAllTeachers = async () => {
    return await teacherModel.getAllTeachers();
};

const registerTeacher = async (name, subject, grades) => {
    return await teacherModel.registerTeacher(name, subject, grades);
};

export default {
    getAllTeachers,
    registerTeacher,
};
