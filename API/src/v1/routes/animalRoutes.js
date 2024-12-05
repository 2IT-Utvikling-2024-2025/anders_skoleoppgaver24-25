const express = require('express');
const { getAllAnimals, getSingleAnimal, createAnimal, updateAnimal, deleteAnimal } = require('../controllers/animalController');


const router = express.Router();

router.get('/', getAllAnimals);
router.get('/:id', getSingleAnimal);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;