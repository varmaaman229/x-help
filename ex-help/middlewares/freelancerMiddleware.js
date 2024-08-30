const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancer');

// Middleware to check if the freelancer is logged in
module.exports.isFreelancerLoggedIn = async function (req, res, next) {
    if (req.cookies.token) {
        try {
            let result = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let freelancer = await Freelancer.findById(result.id);
            if (!freelancer) {
                return res.redirect("/");
            }
            req.freelancer = freelancer;
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
module.exports.redirectIfFreelancerLoggedIn = function (req, res, next) {
    if (req.cookies.token) {
        try {
            let result = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            // Redirect to freelancer home if token is valid
            return res.redirect("/freelancerhome");
        } catch (err) {
            console.error(err); // Log the error for debugging
            return next();
        }
    }
    next();
};
