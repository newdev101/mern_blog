import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup success" });
  } catch (error) {
    next(error);
  }
};


//todo%%%%%%%%%%%%      signin controller   %%%%%%%%%%%%%
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if(!validUser){
       return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
      return next(errorHandler(400, "Invalid password"));
    }

    // remove the hashed password from the validUser object
    const {password:pass, ...rest_user}=validUser._doc;


    const token = jwt.sign( 
        {id: validUser._id},process.env.JWT_SECRET,{expiresIn: "7d"}
    )

    res
    .status(200)
    .cookie('acess_token', token, {
        httpOnly: true,
    })
    .json(rest_user);

  } catch (error) {
    next(error);
  }
};
