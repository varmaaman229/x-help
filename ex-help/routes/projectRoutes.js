const express = require('express');
const router = express.Router();

const { 
    uploadpageController, 
    uploadProjectController, 
    viewProjectController, 
    deleteProjectController,
    editProjectController,
    updateProjectController
} = require("../controllers/projectController");
const { isloggedin } = require("../middlewares/auth-middleware");
const upload = require('../config/multer-config'); 

router.get("/upload", isloggedin, uploadpageController);
router.get("/view/:id", isloggedin, viewProjectController);


router.get("/edit/:id", isloggedin, editProjectController);
router.post("/edit/:id", isloggedin, upload.single('pdf'), updateProjectController);

router.post("/upload", isloggedin, upload.single('pdf'), uploadProjectController);
router.post("/delete/:id", isloggedin, deleteProjectController);

module.exports = router;
