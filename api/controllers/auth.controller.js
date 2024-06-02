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
    const {password:pass, ...rest}=validUser._doc;


    const token = jwt.sign( 
        {id: validUser._id},process.env.JWT_SECRET,{expiresIn: "7d"}
    )

    res
    .status(200)
    .cookie('acess_token', token, {
        httpOnly: true,
    })
    .json(rest);

  } catch (error) {
    next(error);
  }
};


//todo%%%%%%%%%%%%      google controller   %%%%%%%%%%%%%

export const google = async (req, res, next)=>{

  console.log("google server called")
  console.log(req.body);
  
   const { name, email, googlePhotoUrl } = req.body;

   try{
      const user = await User.findOne({email});
      console.log("user find call");
      console.log(user);
      if(user){
        const token = jwt.sign(
          {id: user._id}, process.env.JWT_SECRET,{expiresIn: "7d"}
        )

        const {password:pass, ...rest}=user._doc;
        res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest)
      }else{
        console.log("creating new user");

        const generatedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

        const newUser = new User({
          username: name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });

        try {
          await newUser.save();
          res.json({ message: "Signup success" });
        } catch (error) {
          next(error);
        }

        // ! printing new user
        console.log(newUser)

        const token = jwt.sign(
          {id: newUser._id}, process.env.JWT_SECRET,{expiresIn: "7d"}
        )

        const {password:pass, ...rest}=newUser._doc;

        res
        .status(201)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest)
      }
   }catch(error){
    console.log("error in google server")
     next(error);
   }
}