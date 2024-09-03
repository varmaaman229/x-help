const express = require("express");
const router = express.Router();
const upload = require('../config/multer-config'); // Adjust path as needed

const {
    homepageController,
    loginfreelancerpageController,
    loginFreelancer,
    registerFreelancerPageController,
    registerFreelancer,
    homeafterloginController,
    jobdisplayController,
    jobDetailsController, 
    applyNowPageController, 
    submitApplication ,
    projectdisplayController,
    projectDetailsController
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

// Freelancer home
router.get('/freelancerhome', isFreelancerLoggedIn, homeafterloginController);

// Job display and details
router.get('/jobdisplay', isFreelancerLoggedIn, jobdisplayController);
router.get('/job/:id', isFreelancerLoggedIn, jobDetailsController);

router.get('/apply/:id', isFreelancerLoggedIn, applyNowPageController);
router.post('/apply/:id', isFreelancerLoggedIn, upload.single('resume'), submitApplication);

// Project display
router.get('/projectdisplay', isFreelancerLoggedIn, projectdisplayController);
router.get('/project/:id', isFreelancerLoggedIn, projectDetailsController);

module.exports = router;
