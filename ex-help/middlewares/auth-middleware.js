const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

// Middleware to check if the user is logged in
module.exports.isloggedin = async function (req, res, next) {
    if (req.cookies.token) {
        try {
            let result = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModel.findById(result.id);
            if (!user) {
                return res.redirect("/");
            }
            req.user = user;
            next();
        } catch (err) {
            console.error(err); // Log the error for debugging
            return res.redirect("/");
        }
    } else {
        return res.redirect("/");
    }
};

// Middleware to redirect if already logged in
module.exports.redirectifloggedin = function (req, res, next) {
    if (req.cookies.token) {
        try {
            let result = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            // Redirect to user-profile if token is valid
            return res.redirect("/userhome");
        } catch (err) {
            console.error(err); // Log the error for debugging
            return next();
        }
    }
    next();
};
