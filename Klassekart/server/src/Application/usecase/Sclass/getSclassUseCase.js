const InMemoryClassRepository = require('../../../Infrastructure/repositories/InMemoryClassRepository');

const getSclassUseCase = async (id) => {
    return await InMemoryClassRepository.findById(id);
}

module.exports = getSclassUseCase;