const InMemoryStudentRepository = require('../../../Infrastructure/repositories/InMemoryStudentRepository');

const updateStudentUseCase = async (id, {name, age}) => {
    const student = await InMemoryStudentRepository.findById(id);
    student.name = name;
    student.age = age;
    await InMemoryStudentRepository.update(student);
    return student;
}

module.exports = updateStudentUseCase;