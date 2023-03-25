const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.email = req.body.email;
    const pwdHash = await bcrypt.hash(req.body.password, 10);
    newUser.password = pwdHash;

    const userDb = await newUser.save();

    return res.json({
      status: 201,
      message: 'User registered correctly! Welcome aboard!',
      data: userDb
    });
  } catch (err) {
    return next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email })
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: 'Login con éxito',
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: 'Bad request', data: null });
    }
  } catch (err) {
    return next(err);
  }
}

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization; 

  if(!authorization) { 
      return res.status(401).json({
          status: 401,
          message: "Unauthorized",
          data: null
      });
  }

  const splits = authorization.split(" ");
  if(splits.length!=2 || splits[0]!="Bearer"){// 
      return res.status(400).json({
          status: 400,
          message: "Bad Request",
          data: null
      })
  }

  const jwtString = splits[1] 

  try {
      var token = jwt.verify(jwtString, req.app.get("secretKey")); 

  } catch(err) {
      return next(err)
  }

  const authority = { 
      id   : token.id,
      email : token.email
  }
  req.authority = authority;
  next();
}

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: 'Logout OK',
      token: null
    });
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  register,
  login,
  isAuth,
  logout
}