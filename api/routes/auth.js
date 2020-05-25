const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
// const verify = require("./verifyToken");
const { RegisterValidation, LoginValidation } = require('../Validation');

// Register 
router.post('/register', async (req, res) => {

	const { error } = RegisterValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send("Email already exist");

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try {
		const userData = await user.save();
		const token = jwt.sign({id: userData._id}, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXP });
		res.header("auth-token", token).send(token);
		// res.json({token: token});
	} catch(err) {
		res.status(400).send(err);
	}

});


// Login
router.post('/login', async (req, res) => {

	const { error } = LoginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if(!user) return res.status(400).send("Email not register");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if(!validPassword) return res.status(400).send("Password is Incorrect");

	const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXP });
	res.header("auth-token", token).send(token);
	// res.send("LoggedIn...")

});


module.exports = router;