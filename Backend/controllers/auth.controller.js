import User from '../models/user.model.js';
import errorHandler from '../utils/errorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const singUp=async (req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return next(errorHandler(400,"All fields are required"));
    } 
    const alreadyExist=await User.findOne({email});
    if(alreadyExist){
        return next(errorHandler(400,"User already Exist"));
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({username,email,password:hashedPassword});
    return res.status(200).json({
        success:true,
        message:"user already created",
        user  
    })
}   

export const signIn=async (req,res,next)=>{
    try{    
        const {email,password}=req.body;
        const validUser=await User.findOne({email});
        if(!validUser) next(errorHandler(400,"User not found"));
        const validPassword=bcrypt.compare(password,validUser.password);
        if(!validPassword) next(errorHandler(401,"Wrong Credentials"));
        const {password:pass,...rest}=validUser._doc;

        const token=await jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        res.cookie('access_token',token,{httpOnly:true}).status(200).json({
            rest
        })
    } catch(error){
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
  
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  
      }
    } catch (error) {
      next(error)
    }
  }