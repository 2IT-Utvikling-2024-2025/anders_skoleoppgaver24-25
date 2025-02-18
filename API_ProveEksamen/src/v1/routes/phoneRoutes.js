const express = require('express');
const router = express.Router();
const { 
    getAllPhonesController, 
    getSinglePhoneController, 
    createPhoneController, 
    updatePhoneController, 
    deletePhoneController 
} = require('../controllers/phoneController');

router.get('/phones', getAllPhonesController);
router.get('/phones/:id', getSinglePhoneController);
router.post('/phones', createPhoneController);
router.put('/phones/:id', updatePhoneController);
router.delete('/phones/:id', deletePhoneController);

module.exports = router;
