function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.status(401).json({
        "status": "error",
        "message": "no user"
    })
}

function isAdmin(req, res, next) {
    if (req.user.isAdmin === true)
        return next();
    res.status(401).json({
        "status": "error",
        "message": "not an admin"
    })
}

module.exports = {isAuthenticated, isAdmin};