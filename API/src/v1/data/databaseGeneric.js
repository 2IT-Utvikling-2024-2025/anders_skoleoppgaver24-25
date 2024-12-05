
let objects = [
    {
        id: 1,
        animal: "Dog",
        name: "Fido",
        age: 3
    },
    {
        id: 2,
        animal: "Cat",
        name: "Garfield",
        age: 5
    },
    {
        id: 3,
        animal: "Cat",
        name: "Sarfield",
        age: 7
        }
];


const getAllObjects = () => {
    return [...objects];
}


const addObject = (object) => {
    const id = objects.length ? objects[objects.length - 1].id + 1 : 1; 
    const newObject = { id, ...object };
    objects.push(newObject);
    return newObject;
}


const getObjectById = (id) => {
    id = parseInt(id);
    if (isNaN(id)) return null; 
    return objects.find((object) => object.id === id); 
}


const deleteObjectById = (id) => {
    id = parseInt(id); 
    if (isNaN(id)) return false; 

    
    const index = objects.findIndex((object) => object.id === id);

    
    if (index !== -1) {
        objects.splice(index, 1);
        return true;
    }
    return false;
}


const updateObjectById = (id, updatedObject) => {
    id = parseInt(id); 
    if (isNaN(id)) return false; 

   
    const index = objects.findIndex((object) => object.id === id);
    if (index !== -1) {
        objects[index] = { ...objects[index], ...updatedObject };
        return objects[index];
    }
    return null;
}


module.exports = {
    getAllObjects,
    addObject,
    getObjectById,
    deleteObjectById,
    updateObjectById
}