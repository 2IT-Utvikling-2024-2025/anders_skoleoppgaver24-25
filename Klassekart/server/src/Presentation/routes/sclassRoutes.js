const express = require('express');
const sclassController = require('../controllers/sclassController');

const router = express.Router();


router.post('/', sclassController.createSclass);

router.get('/', sclassController.getAllSclass);

router.get('/:id', sclassController.getSclass);

router.put('/:id', sclassController.updateSclass);

router.delete('/:id', sclassController.deleteSclass);

module.exports = router;