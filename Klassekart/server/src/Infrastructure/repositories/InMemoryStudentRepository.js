const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, "../data/studentsData.json");
const students = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

class InMemoryStudentRepository {
    async findAll() {
        return students;
    }

    async findById(id) {
        return students.find(student => student.id === id);
    }

    async save(student) {
        students.push(student);
    }

    async update(updatedStudent) {
        const index = students.findIndex(student => student.id === updatedStudent.id);
        students[index] = updatedStudent;
    }

    async delete(id) {
        const index = students.findIndex(student => student.id === id);
        students.splice(index, 1);
    }
}

module.exports = new InMemoryStudentRepository;