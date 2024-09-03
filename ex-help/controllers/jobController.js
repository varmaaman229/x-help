const Job = require('../models/job');
const User = require('../models/User');

// Render the upload job page
module.exports.uploadJobPageController = async function (req, res) {
    res.render('uploadJob');
};

// Handle job upload
module.exports.uploadJobController = async function (req, res) {
    try {
        const { title, description, location, salary, jobType, company, companyLogo, applicationDeadline } = req.body;
        const userId = req.user._id;

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            jobType,
            company,
            companyLogo,
            applicationDeadline,
            user: userId
        });

        await newJob.save();
        await User.findByIdAndUpdate(userId, { $push: { jobs: newJob._id } });

        res.redirect('/user-profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// View a specific job
module.exports.viewJobController = async function (req, res) {
    try {
        const job = await Job.findById(req.params.id).populate('user');
        if (!job) {
            return res.status(404).send('Job not found');
        }
        res.render('viewJob', { job });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Render the edit job page
module.exports.editJobPageController = async function (req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).send('Job not found');
        }
        res.render('editJob', { job });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle job edit
module.exports.editJobController = async function (req, res) {
    try {
        const { title, description, location, salary, jobType, company, companyLogo, applicationDeadline } = req.body;
        await Job.findByIdAndUpdate(req.params.id, { title, description, location, salary, jobType, company, companyLogo, applicationDeadline });
        res.redirect('/user-profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle job deletion
module.exports.deleteJobController = async function (req, res) {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.redirect('/user-profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
