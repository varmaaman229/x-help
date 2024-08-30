const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancer');

module.exports.homepageController = function (req, res) {
  res.render("index"); 
};

module.exports.loginfreelancerpageController = function (req, res) {
  res.render("login-freelancer"); 
};


module.exports.loginFreelancer = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const freelancer = await Freelancer.findOne({ email }).select('+password');
    if (!freelancer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, freelancer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: freelancer._id, username: freelancer.username },
      process.env.JWT_KEY
    );

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/freelancerhome'); // Redirect to a dashboard or home page upon successful login
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
};

module.exports.registerFreelancerPageController = function (req, res) {
  res.render("register-freelancer");
};

// Handle the registration logic
module.exports.registerFreelancer = async function (req, res) {
  try {
    const { username, name, email, password, description, skills } = req.body;

    if (!username || !name || !email || !password || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingFreelancer = await Freelancer.findOne({ email });
    if (existingFreelancer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const freelancer = new Freelancer({
      username,
      name,
      email,
      password: hashedPassword,
      description,
      skills
    });

    await freelancer.save();

    const token = jwt.sign(
      { id: freelancer._id, username: freelancer.username },
      process.env.JWT_KEY
    );

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/freelancerhome'); // Redirect to freelancer home page after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
};









module.exports.homeafterloginController = async function (req, res, next) {
  res.render('freelancerhome');
}

module.exports.jobdisplayController = async function (req , res, next) {
  res.render('jobdisplay');
}

module.exports.projectdisplayController = async function (req , res, next) {
  res.render('projectdisplay');
}
