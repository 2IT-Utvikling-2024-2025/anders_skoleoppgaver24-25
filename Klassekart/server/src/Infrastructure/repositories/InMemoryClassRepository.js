const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, "../data/SclassData.json");
const Sclasses = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

class InMemoryClassRepository {
    async findAll() {
        return Sclasses.map(({ id, name }) => ({ id, name }));
    }

    async findById(id) {
        return Sclasses.find(Sclass => Sclass.id === id);
    }

    async save(Sclass) {
        Sclasses.push(Sclass);
    }

    async update(updatedSclass) {
        const index = Sclasses.findIndex(Sclass => Sclass.id === updatedSclass.id);
        Sclasses[index] = updatedSclass;
    }

    async delete(id) {
        const index = Sclasses.findIndex(Sclass => Sclass.id === id);
        Sclasses.splice(index, 1);
    }
}

module.exports = new InMemoryClassRepository();