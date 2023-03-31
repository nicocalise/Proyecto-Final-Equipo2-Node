const express = require("express");
const router = express.Router();


//importamos las funciones del controlador y del middleware
const { register, login, isAuth, logout } = require("../auth/jwt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
router.post("/register", register);
router.post("/login", login);
router.post("/logout", [isAuth], logout);

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
});

router.delete("/deleteUser/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json("User deleted");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
