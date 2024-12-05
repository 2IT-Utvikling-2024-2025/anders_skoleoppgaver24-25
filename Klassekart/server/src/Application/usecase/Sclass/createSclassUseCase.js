const Sclass = require('../../../Domain/Sclass');

const InMemoryClassRepository = require('../../../Infrastructure/repositories/InMemoryClassRepository');
const InMemoryStudentRepository = require('../../../Infrastructure/repositories/InMemoryStudentRepository');

const createSclassUseCase = async ({name, listOfStudentsID}) => {

    const students = await Promise.all(listOfStudentsID.map(id => InMemoryStudentRepository.findById(id)));

    const sclass = new Sclass({name, students});
    await InMemoryClassRepository.save(sclass);
    return sclass;
}

module.exports = createSclassUseCase;