const mongoose = require('mongoose');
const db = require('./db');


// create a new mongo model for "Pet"
const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    picture: String,
    height: Number,
    weight: Number,
    color: String,
    bio: String,
    hypoallergnic: Boolean,
    ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    adoptionStatus: String
});
const Pet = mongoose.model('Pets', petSchema);

module.exports = Pet;
