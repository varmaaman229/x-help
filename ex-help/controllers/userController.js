const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

module.exports.homepageController = function (req, res) {
  res.render("index"); 
};

module.exports.homepageafterloginController = function (req, res) {
  res.render("userhome", { loggedin: true }); 
}

module.exports.registeruserpageController = function (req, res) {
  res.render("register-user", { loggedin: false });
};

module.exports.loginuserpageController = function (req, res) {
  res.render("login-user", { loggedin: false }); // Render the login page when accessed
};

module.exports.registeruserController = async function (req, res) {
  let { name, username, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.send("You already have an account, please login");
    }

    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.buffer.toString("base64");
    }

    user = await userModel.create({
      name,
      username,
      email,
      password: hashed,
      image: imageUrl,
    });

    let token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY
    );
    res.cookie("token", token);
    res.redirect("/userhome");
  } catch (err) {
    if (!res.headersSent) {
      return res.status(500).send(err.message);
    }
  }
};

module.exports.loginuserController = async function (req, res) {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.send("User not found");
    }

    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.send("Incorrect password");
    }

    let token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY
    );
    res.cookie("token", token);
    res.redirect("/userhome");
  } catch (err) {
    if (!res.headersSent) {
      return res.status(500).send(err.message);
    }
  }
};

module.exports.userprofileController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email })
      .populate('projects')
      .populate('jobs');

    res.render('user-profile', { user });
  } catch (err) {
    if (!res.headersSent) {
      return res.status(500).send(err.message);
    }
  }
};

module.exports.logoutController = function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports.uploadprojectController = function (req, res) {
  res.render("upload");
};
