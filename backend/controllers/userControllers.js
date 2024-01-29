const mongoose = require("mongoose");
const { userModel } = require("../modals/userModel.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { ErrorCustomHandler } = require("../middlewares/customErrorHandler.js");
const SignupController = asyncHandler(async (req, res, next) => {
  let { name, email, phone, password } = req.body;
  let userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(
      new ErrorCustomHandler("user already exist please use different id!", 400)
    );
  }
  const saltRounds = 10;
  let genSalt = await bcrypt.genSalt(saltRounds);
  let hassedPassword = await bcrypt.hash(password, genSalt);
  let user = await userModel.create({
    name: name,
    email: email,
    phone: phone,
    password: hassedPassword,
  });
  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      admin: user.isAdmin,
      pic: user.pic,
      email: user.email,
    });
  } else {
    return next(
      new ErrorCustomHandler("user already exist please use different id!", 400)
    );
  }
});
const LoginController = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let IsUserExist = await userModel.findOne({ email });
    if (!IsUserExist) {
      return next(
        new ErrorCustomHandler("user doesn't exist please signup first", 400)
      );
    }
    let IsPasswordMatvh = await bcrypt.compare(password, IsUserExist.password);
    if (IsPasswordMatvh) {
      var token = jsonwebtoken.sign(
        {
          id: IsUserExist._id,
        },
        process.env.SECRETPRIVATEKEY,
        { expiresIn: "1h" }
      );
      let { name, phone, email, pic, isAdmin, password } = IsUserExist;
      res.send({
        user: {
          name: name,
          phone: phone,
          email: email,
          admin: isAdmin,
          pic: pic,
          token: token,
        },
      });
    } else {
      return next(
        new ErrorCustomHandler(
          "email or password is not matched please use correct credientails",
          400
        )
      );
    }
  } catch (error) {
    return next(new ErrorCustomHandler("something went wrong!", 400));
  }
});
const isUserLoggedIn = asyncHandler(async (req, res, next) => {
  try {
    var decoded;
    if (req.headers && req.headers.authorization) {
      var authToken = req.headers.authorization.split(" ")[1];
      decoded = jsonwebtoken.verify(authToken, process.env.SECRETPRIVATEKEY);
      var userId = decoded.id;
      console.log("userId", userId);
      let userdetails = await userModel.findById({
        _id: userId,
      });
      console.log("userId", userdetails);
      req.user = userdetails;
      next();
    }
  } catch (e) {
    return next(new ErrorCustomHandler("unauthorised user!", 400));
  }
});
module.exports = { SignupController, LoginController, isUserLoggedIn };
