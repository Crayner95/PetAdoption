// https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/

// dependencies
const mongoose = require('mongoose');
const db = require('./db');
const passportLocalMongoose = require('passport-local-mongoose');


// Create Model
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    username: String,
    bio: String,
    savedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    isAdmin: Boolean
});
// Export Model
UserSchema.plugin(passportLocalMongoose); // lets you register+login with mongoose.
const User = mongoose.model('users', UserSchema);

// this is how you register a new user
// UserModel.register({username: "foo"}, "bar");

module.exports = User;