const InMemoryStudentRepository = require('../../../Infrastructure/repositories/InMemoryStudentRepository');


const getAllStudentsUseCase = async () => {
    return await InMemoryStudentRepository.findAll();
}

module.exports = getAllStudentsUseCase;