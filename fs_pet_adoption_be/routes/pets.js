const express = require('express')
const Pet = require('../pet.js');
const router = express.Router();
const {isAuthenticated }= require('../middleware')


router.get('/pets', async (req, res, next) => {
    const searchParams = {}
    if (req.query.hypoallergnic === "true") {
        searchParams.hypoallergnic = true
    }
    if (req.query.name) {
        searchParams.name = req.query.name
    }
    if (req.query.type) {
        searchParams.type = req.query.type
    }
    if (req.query.adoptionStatus) {
        searchParams.adoptionStatus = req.query.adoptionStatus
    }
    if (req.query.height) {
        searchParams.height = { $gt: parseInt(req.query.height[0]), $lt: parseInt(req.query.height[1]) }
    }
    if (req.query.weight) {
        searchParams.weight = { $gt: parseInt(req.query.weight[0]), $lt: parseInt(req.query.weight[1]) }
    }
    if (req.query.color) {
        searchParams.color = req.query.color
    }
    const pets = await Pet.find(searchParams);
    res.json({ pets });
})



router.get('/mypets', isAuthenticated, async (req, res) => {
    const searchParams = {}
    searchParams.ownedBy = req.user
    const mypets = await Pet.find(searchParams);
    res.json(mypets);
})

router.get('/savedpets', isAuthenticated, async (req, res) => {
    const savedPetCards = await Promise.all(req.user.savedPets.map(id => Pet.findById(id)))

    // req.user.savedPets ["123","456"]
    // map [Pet.findById("123") -> Promise, Pet.findById("456") -> Promise]
    // map [Promise, Promise]
    // await Promise.all [{object}, {object}]

    // printing out the value inside and not adding the key name as an object
    res.json(savedPetCards);
})

module.exports = router;
