const express = require("express");
const router = express.Router();

const {
    homepageController,
    loginfreelancerpageController,
    loginFreelancer,
    registerFreelancerPageController,
    registerFreelancer,
    homeafterloginController,
    jobdisplayController,
    projectdisplayController
} = require("../controllers/freelancerController");

const {
    isFreelancerLoggedIn,
    redirectIfFreelancerLoggedIn
} = require('../middlewares/freelancerMiddleware');

router.get("/", homepageController);

// Login routes
router.get('/login-freelancer', redirectIfFreelancerLoggedIn, loginfreelancerpageController);
router.post('/login-freelancer', async (req, res) => {
    try {
        await loginFreelancer(req, res);
    } catch (error) {
        res.redirect(`/login-freelancer?error=${encodeURIComponent(error.message)}`);
    }
});

// Registration routes
router.get('/register-freelancer', redirectIfFreelancerLoggedIn, registerFreelancerPageController);
router.post('/register-freelancer', async (req, res) => {
    try {
        await registerFreelancer(req, res);
    } catch (error) {
        res.redirect(`/register-freelancer?error=${encodeURIComponent(error.message)}`);
    }
});

// Home after login (only accessible if logged in)
router.get('/freelancerhome', isFreelancerLoggedIn, homeafterloginController);

// Job and Project display (only accessible if logged in)
router.get('/jobdisplay', isFreelancerLoggedIn, jobdisplayController);
router.get('/projectdisplay', isFreelancerLoggedIn, projectdisplayController);

module.exports = router;
