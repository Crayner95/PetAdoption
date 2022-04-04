require('dotenv').config();
const express = require('express')
// const cookieSession = require('cookie-session')
const session = require('express-session')
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express();
const auth = require('./routes/auth');
const pets = require('./routes/pets');
const users = require('./routes/users');
const admin = require('./routes/admin');


const User = require('./user.js');

app.use(cookieSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

// uses the passport-local-mongoose plugin to creates a strategy function 
// that authenticates the user using the User model
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', auth);
app.use('/api', pets);
app.use('/api', users);
app.use('/api', admin);

// https://dev.to/franciscomendes10866/image-upload-to-cloudinary-with-node-js-523o

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

