const express = require('express')
const User = require('../user.js');
const router = express.Router();
const { isAuthenticated } = require('../middleware');
const mongoose = require('mongoose');

router.get('/user', isAuthenticated, function (req, res) {
    res.json(req.user)
});

router.put('/user', async function (req, res) {
    const user = await User.findById(req.user._id);

    if (req.body.savedPets) {
        user.savedPets = [...new Set(req.body.savedPets)].map(id => new mongoose.Types.ObjectId(id))
    };
    if (req.body.firstName) {
        user.firstName = req.body.firstName
    }
    if (req.body.lastName) {
        user.lastName = req.body.lastName
    }
    if (req.body.username) {
        user.username = req.body.username
    }
    if (req.body.password) {
        await user.setPassword(req.body.password);
        await user.save();
    }
    if (req.body.bio) {
        user.bio = req.body.bio
    }
    await user.save();

    res.json(user);
});

module.exports = router;

