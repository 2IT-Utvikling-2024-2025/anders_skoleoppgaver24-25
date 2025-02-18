const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'phoneData.json');


const readData = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};


const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};


const getAllPhones = async () => {
    return readData();
};


const addPhone = async (phone) => {
    const phones = readData();
    const id = phones.length ? Math.max(...phones.map(p => p.id)) + 1 : 1;
    const newPhone = { id, ...phone };
    phones.push(newPhone);
    writeData(phones);
    return newPhone;
};


const getPhoneById = async (id) => {
    const phones = readData();
    id = parseInt(id);
    return phones.find(phone => phone.id === id) || null;
};


const deletePhoneById = async (id) => {
    let phones = readData();
    id = parseInt(id);
    const index = phones.findIndex(phone => phone.id === id);
    if (index !== -1) {
        phones.splice(index, 1);
        writeData(phones);
        return true;
    }
    return false;
};


const updatePhoneById = async (id, updatedPhone) => {
    let phones = readData();
    id = parseInt(id);
    const index = phones.findIndex(phone => phone.id === id);
    if (index !== -1) {
        phones[index] = { ...phones[index], ...updatedPhone };
        writeData(phones);
        return phones[index];
    }
    return null;
};

module.exports = {
    getAllPhones,
    addPhone,
    getPhoneById,
    deletePhoneById,
    updatePhoneById
};
