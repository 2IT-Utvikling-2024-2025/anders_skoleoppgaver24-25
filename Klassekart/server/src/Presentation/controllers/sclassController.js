const createSclassUseCase = require('../../Application/usecase/Sclass/createSclassUseCase');
const deleteSclassUseCase = require('../../Application/usecase/Sclass/deleteSclassUseCase');
const getAllSclassUseCase = require('../../Application/usecase/Sclass/getAllSclassUseCase');
const getSclassUseCase = require('../../Application/usecase/Sclass/getSclassUseCase');
const updateSclassUseCase = require('../../Application/usecase/Sclass/updateSclassUseCase');

const createSclass = async (req, res) => {
    try {
        const {name, listOfStudentsID} = req.body;
        const sclass = await createSclassUseCase({name, listOfStudentsID});
        res.status(201).json(sclass);
    } catch (error) {
        console.log(error)
    }
}

const getAllSclass = async (req, res) => {
    try {
        const sclasses = await getAllSclassUseCase();
        res.status(200).json(sclasses);
    } catch (error) {
        console.log(error)
    }
}

const getSclass = async (req, res) => {
    try {
        const sclass = await getSclassUseCase(req.params.id);
        res.status(200).json(sclass);
    } catch (error) {
        console.log(error)
    }
}

const updateSclass = async (req, res) => {
    try {
        const {name, listOfStudentsID} = req.body;
        const sclass = await updateSclassUseCase(req.params.id, {name, listOfStudentsID});
        res.status(200).json(sclass);
    } catch (error) {
        console.log(error)
    }
}

const deleteSclass = async (req, res) => {
    try {
        const sclass = await deleteSclassUseCase(req.params.id);
        res.status(200).json(sclass);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createSclass, getAllSclass, getSclass, updateSclass, deleteSclass};