const express = require("express");
const router = express.Router();
//importamos las funciones del controlador y del middleware
const { register, login, isAuth, logout } = require("../auth/jwt");
const User = require("../models/user");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", [isAuth], logout);
router.get('/', async (req, res, next) => {
	try {
		const cars = await User.find();
		return res.status(200).json(cars)
	} catch (err) {
		return res.status(500).json(err);
	}
});



module.exports = router;