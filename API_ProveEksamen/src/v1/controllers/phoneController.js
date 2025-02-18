const { getAllPhones, addPhone, getPhoneById, deletePhoneById, updatePhoneById } = require('../data/databaseGeneric');

const getAllPhonesController = async (req, res) => {
    try {
        const phones = await getAllPhones();
        res.status(200).json({ success: true, data: phones });
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const getSinglePhoneController = async (req, res) => {
    try {
        const phone = await getPhoneById(req.params.id);
        if (!phone) {
            return res.status(404).json({ success: false, error: "Phone not found" });
        }
        res.status(200).json({ success: true, data: phone });
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const createPhoneController = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                success: false,
                error: "All fields (name, price) are required."
            });
        }

        const newPhone = await addPhone({ name, price });
        res.status(201).json({ success: true, data: newPhone });
    } catch (error) {
        console.error("Error in createPhoneController:", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const updatePhoneController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                success: false,
                error: "All fields (name, price) are required."
            });
        }

        const updatedPhone = await updatePhoneById(id, { name, price });
        if (!updatedPhone) {
            return res.status(404).json({ success: false, error: "Phone not found" });
        }

        res.status(200).json({ success: true, data: updatedPhone });
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const deletePhoneController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deletePhoneById(id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Phone not found" });
        }

        res.status(200).json({ success: true, message: "Phone deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

module.exports = { 
    getAllPhonesController, 
    getSinglePhoneController, 
    createPhoneController, 
    updatePhoneController, 
    deletePhoneController 
};
