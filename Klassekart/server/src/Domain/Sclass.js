const crypto = require('crypto');

class Sclass {
    constructor({name, students}) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.students = students;
    }
}

module.exports = Sclass;