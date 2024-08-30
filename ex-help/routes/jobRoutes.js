const express = require('express');
const router = express.Router();
const { 
    uploadJobPageController, 
    uploadJobController, 
    viewJobController, 
    editJobPageController, 
    editJobController, 
    deleteJobController 
} = require('../controllers/jobController');
const { isloggedin } = require('../middlewares/auth-middleware');

router.get('/upload', isloggedin, uploadJobPageController);
router.post('/upload', isloggedin, uploadJobController);

router.get('/view/:id', isloggedin, viewJobController);
router.get('/edit/:id', isloggedin, editJobPageController);
router.post('/edit/:id', isloggedin, editJobController);
router.post('/delete/:id', isloggedin, deleteJobController);

module.exports = router;
