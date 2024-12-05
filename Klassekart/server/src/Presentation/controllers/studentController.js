
const getAllStudentsUseCase = require('../../Application/usecase/Student/getAllStudentsUseCase');
const createStudentUseCase = require('../../Application/usecase/Student/createStudentUseCase');
const getStudentUseCase = require('../../Application/usecase/Student/getStudentUseCase');
const updateStudentUseCase = require('../../Application/usecase/Student/updateStudentUseCase');
const deleteStudentUseCase = require('../../Application/usecase/Student/deleteStudentUseCase');

const createStudent = async (req, res) => {
    try {
        const {name, age} = req.body;
        console.log(name, age)
        const student = await createStudentUseCase({name, age});
        res.status(201).json(student);
    } catch (error) {
        console.log(error)
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await getAllStudentsUseCase();
        res.status(200).json(students);
    } catch (error) {
        console.log(error)
    }
}

const getStudent = async (req, res) => {
    try {
        const student = await getStudentUseCase(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        console.log(error)
    }
}

const updateStudent = async (req, res) => {
    try {
        const {name, age} = req.body;
        const student = await updateStudentUseCase( req.params.id, {name, age});
        res.status(200).json(student);
    } catch (error) {
        console.log(error)
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await deleteStudentUseCase(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}