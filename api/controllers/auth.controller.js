import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/error.js";

export const signup = async(req, res, next)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
          next(errorHandler(400, "All fields are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
     username,
     email,
     password:hashPassword,
    });

    try{

     await newUser.save();
     res.json({"message":"Signup success"});

    }catch (error){   

     next(error);
     
    }

}



export const login = async(req, res)=>{
     console.log(req.body);
     return res.json({message:'login success'})
}