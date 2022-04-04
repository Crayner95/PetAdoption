const express = require('express')
const router = express.Router();
const passport = require('passport');
const User = require('../user.js');

router.post('/register', async (req, res, next) => {
    try {
        const result = await User.register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            username: req.body.username,
        }, req.body.password);
        res.json(result.data);

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.end()
});

module.exports = router;
