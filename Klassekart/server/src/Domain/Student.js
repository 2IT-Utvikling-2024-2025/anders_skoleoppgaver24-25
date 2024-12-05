const crypto = require('crypto');

class Student {
    constructor({name, age}) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.age = age;
    }
}

module.exports = Student;