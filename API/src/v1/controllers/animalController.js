const { getAllObjects, addObject, getObjectById, deleteObjectById, updateObjectById } = require("../data/databaseGeneric");

const getAllAnimals = async (req, res) => {
    try {
        const animals = await getAllObjects();
        res.status(200).json({ success: true, data: animals });
    } catch (error) {
        console.error("Error fetching animals:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const getSingleAnimal = async (req, res) => {
    try {
        const animal = await getObjectById(req.params.id);
        if (animal) {
            res.status(200).json({ success: true, data: animal });
        } else {
            res.status(404).json({ success: false, error: "Animal not found" });
        }
    } catch (error) {
        console.error("Error fetching animal:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const createAnimal = async (req, res) => {
    try {
        const { animal, name, age } = req.body;

        
        if (!animal || !name || typeof age !== 'number') {
            return res.status(400).json({ success: false, error: "Missing or invalid required fields" });
        }

        if (age < 1800 || age > new Date().getFullYear()) {
            return res.status(400).json({ success: false, error: "Invalid year for age" });
        }

        const newAnimal = await addObject({ animal, name, age });
        res.status(201).json({ success: true, data: newAnimal });
    } catch (error) {
        console.error("Error creating animal:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const { animal, name, age } = req.body;

        
        if (!animal && !name && age === undefined) {
            return res.status(400).json({ success: false, error: "At least one field must be provided for update" });
        }

        const updatedAnimal = await updateObjectById(id, { animal, name, age });

        if (updatedAnimal) {
            res.status(200).json({ success: true, data: updatedAnimal });
        } else {
            res.status(404).json({ success: false, error: "Animal not found" });
        }
    } catch (error) {
        console.error("Error updating animal:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteObjectById(id);

        if (deleted) {
            res.status(200).json({ success: true, message: "Animal deleted successfully" });
        } else {
            res.status(404).json({ success: false, error: "Animal not found" });
        }
    } catch (error) {
        console.error("Error deleting animal:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = {
    getAllAnimals,
    getSingleAnimal,
    createAnimal,
    updateAnimal,
    deleteAnimal,
};
