const Student = require('../../../Domain/Student');

const InMemoryStudentRepository = require('../../../Infrastructure/repositories/InMemoryStudentRepository');

const createStudentUseCase = async ({name, age}) => {
    const student = new Student({name, age})
    await InMemoryStudentRepository.save(student);
    return student;
}

module.exports = createStudentUseCase;