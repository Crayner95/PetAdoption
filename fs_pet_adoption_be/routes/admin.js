const express = require('express')
const User = require('../user.js');
const router = express.Router();
const { isAdmin } = require('../middleware');
const upload = require('../upload');
const Pet = require('../pet.js');

router.put('/pets/:id', isAdmin, upload.single("picture"), async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    if (req.body.adoptionStatus) {
        pet.ownedBy = req.body.adoptionStatus === "Available" ? null : req.user;
        pet.adoptionStatus = req.body.adoptionStatus;
    }
    if (req.body.name) {
        pet.name = req.body.name;
    }
    if (req.body.height) {
        pet.height = req.body.height;
    }
    if (req.body.weight) {
        pet.weight = req.body.weight;
    }
    if (req.body.breed) {
        pet.breed = req.body.breed;
    }
    if (req.body.color) {
        pet.color = req.body.color;
    }
    if (req.body.hypoallergnic) {
        pet.hypoallergnic = req.body.hypoallergnic;
    }
    if (req.file) {
        pet.picture = req.file.path;
    }
    await pet.save();
    res.json(pet);

})

router.delete('/pets/:id', isAdmin, (req, res) => {
    Pet.findByIdAndDelete(req.params.id)
    res.end();
})

router.post('/pets', isAdmin, upload.single("picture"), async (req, res) => {
    try {
        const newPet = await Pet.create({
            name: req.body.name,
            type: req.body.type,
            adoptionStatus: req.body.adoptionStatus,
            color: req.body.color,
            height: req.body.height,
            weight: req.body.weight,
            hypoallergnic: req.body.hypoallergnic,
            picture: req.file.path
        });
        console.log(newPet)
        res.json(newPet);

    } catch (err) {
        console.log(err.message);
        res.status(500).json(err)
    }
})

router.get('/users', isAdmin, async (req, res) => {
    const searchParams = {}
    const allUsers = await User.find(searchParams);

    const usersWithOwnedPets = [];

    for (let i = 0; i < allUsers.length; i++) {
        let user = allUsers[i].toObject();
        user.ownedPets = await Pet.find({ ownedBy: user._id });
        usersWithOwnedPets.push(user)
    }
    res.json(usersWithOwnedPets);
})

router.delete('/users/:id', isAdmin, async (req, res) => {
    console.log(req.params.id)
    await User.findByIdAndDelete(req.params.id)
    res.end();
})

module.exports = router;