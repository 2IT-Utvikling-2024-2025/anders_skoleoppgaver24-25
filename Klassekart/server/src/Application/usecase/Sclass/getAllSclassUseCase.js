const InMemoryClassRepository = require('../../../Infrastructure/repositories/InMemoryClassRepository');

const getAllSclassUseCase = async () => {
    return await InMemoryClassRepository.findAll();
}

module.exports = getAllSclassUseCase;