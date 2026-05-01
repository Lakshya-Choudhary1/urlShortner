import express from "express";
import {signupUser,loginUser,checkAuth, logoutUser,updateProfilePic,resendEmailVerificationOTP,resetPassword,forgotPassword,verifyEmail} from "../../controllers/user.controller.js"
import verifyUser from "../../middleware/verifyUser.middleware.js";

const userRoute = express.Router();

userRoute.post('/signup',signupUser);
userRoute.post('/login',loginUser);
userRoute.get('/logout',logoutUser);
userRoute.get('/checkAuth',verifyUser,checkAuth);
userRoute.post('/updateProfilePic',verifyUser,updateProfilePic);
userRoute.post('/resendEmailVerificationOTP',verifyUser,resendEmailVerificationOTP);
userRoute.post('/forgotPassword',forgotPassword);
userRoute.post('/resetPassword/:resetPasswordToken',resetPassword);
userRoute.post('/verifyEmail',verifyEmail);



export default userRoute;