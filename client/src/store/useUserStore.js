import {create} from "zustand";
import axiosInstance from '../utils/axios.js';
import { toast } from 'react-hot-toast';


const useUserStore = create((set,get) => ({
     user: null,
     setUser: (userData) => set({user: userData}),

     signup : async({fullName,email,password})=>{
          try{
               const res = axiosInstance.post('/user/signup',{fullName,email,password});
               if(res.data.user){
                    toast.success("Otp Sent To : ",email);
                    set({user:res.data.user});
               }
          }catch(err){
               set({user:null})
               console.log("ERROR:",err);
               toast.error("Try again later")
          }
     }

     ,logout: async() =>{
          try{
               const res =   await axiosInstance.get("/user/logout");
               console.log(res.data);
          }catch(err){
               console.log("ERROR:",err);
               toast.success("Cannot Logout Try Again Later!");
          }finally{
               set({user: null})
               toast.success("Logout Successfully");
          }
     },
     login : async({email,password})=>{
          try{
               const res =   await axiosInstance.post("/user/login",{email,password});
               console.log(res.data.user);
               if(res.data.user){
                    set({user:res.data.user});
                    toast.success("Login Successfull");
               }else{
                    toast.error("Invalid Cradentials");
               }
          }catch(err){
               console.log("ERROR:",err);
               set({user:null})
               toast.success("Cannot Login Try Again Later!");
          }
     },
     checkAuth: async () => {
          try {
               const res = await axiosInstance.get("/user/checkAuth");
               set({ user: res.data.user });
               if(get().user){
                    toast.success('welcome user')
               }
          } catch (err) {
               console.log("ERROR:", err);
          }
     },
     emailVerify : async(emailVerificationToken)=>{
          try{
              const res =  await axiosInstance.post('/user/verifyEmail',{emailVerificationToken});

              if(res.data.user){
                    toast.success("Email is verified");
                    set({user:res.data.user})
              }else{
                    toast.error("Invalid OTP")
              }
          }catch(err){
               console.log(err)

          }
     },
     resendEmailVerificationToken: async()=>{
          try{
               const res = await axiosInstance.get("/user/resendEmailVerification");
               if(res.data.ack){
                    toast.success("OTP Resend");
               }
          }catch(err){
               console.log(err);
          }
     },
     resetPassword: async(newPassword,emailVerificationToken)=>{
          try {
               const res = await axiosInstance.post(`/user/resetPassword/${emailVerificationToken}`,{newPassword})
               toast.success("success")
          } catch (error) {
               console.log(error);
                toast.error("Cannot Reset Link had expired")
          }
     },
     forgotPassword: async(email)=>{
          try {
               const res = await axiosInstance.post(`/user/forgotPassword`,{email});
               toast.success("Reset link had sent to email")
          } catch (error) {
               console.log(error);
          }
     }
}))

export default useUserStore;