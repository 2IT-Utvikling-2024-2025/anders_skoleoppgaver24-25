const InMemoryStudentRepository = require('../../../Infrastructure/repositories/InMemoryStudentRepository');

const getStudentUseCase = async (id) => {
    const student = await InMemoryStudentRepository.findById(id);
    return student;
}


module.exports = getStudentUseCase;