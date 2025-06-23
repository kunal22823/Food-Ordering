import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        //checking existing email
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User Already Exist !"});
        }
        //validating email
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please Enter Valid Email"});
        }
        //validating password
        if (password.length<8) {
            return res.json({success:false,message:"Please Enter Strong Password"});
        }

        //encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPass});

        await newUser.save();
        const token = createToken(newUser._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//login
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"User Not Found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.json({success:false,message:"Invalid Credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
export {loginUser,registerUser};