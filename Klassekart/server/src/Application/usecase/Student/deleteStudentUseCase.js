const InMemoryStudentRepository = require('../../../Infrastructure/repositories/InMemoryStudentRepository');

const deleteStudentUseCase = async (id) => {
    const student = await InMemoryStudentRepository.findById(id);
    await InMemoryStudentRepository.delete(id);
    return student;
}

module.exports = deleteStudentUseCase;