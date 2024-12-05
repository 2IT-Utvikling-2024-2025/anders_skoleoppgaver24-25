const InMemoryClassRepository = require('../../../Infrastructure/repositories/InMemoryClassRepository');

const deleteSclassUseCase = async (id) => {
    return await InMemoryClassRepository.delete(id);
}

module.exports = deleteSclassUseCase;