import userModel from "../models/user.model.js";
import {JWT_TOKEN_NAME,BCRYPT_SALT_ROUND} from "../config/config.js"
import {createTokenAndSetCookie} from "../utils/createTokenAndSetCookie.js"
import createOTP from "../utils/createOTP.js";
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
import { sendEmailVerification, sendforgotPasswordLinkEmail } from "../services/mail.js";


//handle user sign in
export const signupUser = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    // Validate input
    if (!fullName || !password || !email) {
      return res.status(400).json({
        message: "Missing credentials. Cannot signup.",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(
      password,
      Number(BCRYPT_SALT_ROUND)
    );

    // Generate OTP
    const emailVerificationToken = await createOTP();
    await sendEmailVerification(email,emailVerificationToken);

    // Create user
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
      emailVerificationToken,
    });

    // Create auth cookie/token
    await createTokenAndSetCookie(res, newUser._id);

    // Remove password before sending response
    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    };

    return res.status(201).json({
      message: "Signup successful",
      user: userResponse,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server Error While Signup",
    });
  }
};

// handle user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing credentials. Cannot login.",
      });
    }

    // Optional password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Find user WITH password
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist.",
      });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid password.",
      });
    }
    
    if(!user.emailVerified){
      const emailVerificationToken = await createOTP();
      user.emailVerificationToken = emailVerificationToken;
      user.emailVerificationTokenExpiry = Date.now() + 3600000; // 1 hour expiry
      await user.save();
      await sendEmailVerification(email,user.emailVerificationToken);
      return res.status(400).json({
        message: "Email not verified. Please verify your email before logging in.",
      });
    }

    await createTokenAndSetCookie(res, user._id);

    // Remove password before sending response
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };


    return res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error While Login",
    });
  }
};

//handle user logout
export const logoutUser = async(req, res) => {
  try{
    //clear cookie 
    res.clearCookie(JWT_TOKEN_NAME);
    //clear passport session 
    if(req.userId && req.logout){
        req.logout(err=>{
          if(err){
            console.log(error)
          }
        })
    }
    //distroy session if exists
    if(req.session){
      req.session.destroy(err=>{
        if(err){
          console.log(err);
        }
      })
    }

    return res.status(200).json({message:"Logout Successfull."})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To Logout."})
  }
}

export const checkAuth = async(req,res) => {
  try{

    if(!req.userId){
      return res.status(400).json({message:"No User Exists."})
    }

    const user = await userModel.findById(req.userId).select("-password -emailVerificationToken -resetPasswordToken -__v");

    if(!user){
      return res.status(400).json({message:"User Not Found."})
    }

    return res.status(200).json({user:user});

  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To CheckAuth."})
  }
}

//hanfle email verification
export const verifyEmail = async(req,res) => {
  const {emailVerificationToken} = req.body;
  try{
    if(!emailVerificationToken || emailVerificationToken.trim() === ""){
      return res.status(400).json({message:"Missing OTP. Cannot Verify Email."})
    }
  
    const user = await userModel.findOne({emailVerificationToken});
    if(!user || user.emailVerificationTokenExpiry < Date.now()){
      return res.status(400).json({message:"Invalid OTP. Cannot Verify Email."})
    } 

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpiry = null;
    await user.save();
    return res.status(200).json({message:"Email Verified Successfully."})

  } catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To Email Verification."})
  }

} 


//handle resend email verification OTP
export const resendEmailVerificationOTP = async(req,res) => {
  try{
    const user = await userModel.findById(req.userId);

    if(!user){
      return res.status(400).json({message:"User Not Found. Cannot Resend OTP."})
    }

    if(user.isEmailVerified){
      return res.status(400).json({message:"Email Already Verified."})
    }

    if(user.emailVerificationToken && user.emailVerificationTokenExpiry > Date.now()){ 
      return res.status(400).json({message:"OTP Already Sent. Please Wait Before Requesting Again."})
    }

    // Generate new OTP
    const emailVerificationToken = await createOTP();
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    await sendEmailVerification(user.email,emailVerificationToken);

    return res.status(200).json({message:"OTP Resent Successfully."})

  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To Resend OTP."})
   }
}

//handle forgot password
export const forgotPassword = async(req,res) => {
  const {email} = req.body;
  try{
    if(!email){
      return res.status(400).json({message:"Missing Email. Cannot Process Forgot Password."})
    }
    const user = await userModel.findOne({email});
    if(!user){  
      return res.status(400).json({message:"Email Not Found. Cannot Process Forgot Password."})
    }

    const resetPasswordToken = await crypto.randomBytes(16).toString("hex");
    console.log(resetPasswordToken)
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    await sendforgotPasswordLinkEmail(email,`http://localhost:5173/reset-password/${resetPasswordToken}`);

    return res.status(200).json({message:"Forgot Password Processed. Please Check Your Email For Reset Instructions."})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To Forgot Password."})
  }
}

//handle reset password
export const resetPassword = async(req,res) => {
  const { newPassword} = req.body;
  const {resetPasswordToken} = req.params;
  try{
    if(!newPassword || newPassword.length < 6){
      return res.status(400).json({message:"Invalid New Password. Cannot Reset Password."})
    }
    if(!resetPasswordToken){
      return res.status(400).json({message:"Missing Reset Token. Cannot Reset Password."})
    }


    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordTokenExpiry: { $gt: Date.now() }
    }); 

    if(!user){
      return res.status(400).json({message:"Invalid or Expired Reset Token. Cannot Reset Password."})
    }
    
    const hashPassword = await bcrypt.hash(
      newPassword,
      Number(BCRYPT_SALT_ROUND)
    );

    user.password = hashPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiry = null;
    await user.save();

    return res.status(200).json({message:"Password Reset Successfully.",newPassword:newPassword})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To Reset Password."})
  }
};


//handle update profilePic
export const updateProfilePic = async(req,res) => {
  const {profilePic} = req.body;
  try{
    if(!profilePic){
      return res.status(400).json({message:"Missing Profile Pic. Cannot Update Profile Pic."})
    }
    const user = await userModel.findById(req.userId);
    if(!user){
      return res.status(400).json({message:"User Not Found. Cannot Update Profile Pic."})
    }

    const cloudinaryUrl = await uploadImageToCloudinary(profilePic);

    user.profilePic = cloudinaryUrl;
    await user.save();

    return res.status(200).json({message:"Profile Pic Updated Successfully."})

  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Server Error Due To Update Profile Pic."})
  }
}