import mongoose from "mongoose";

const schema = new mongoose.Schema({
     fullName:{
          type: String,
          required: true,
          trim: true,
     },
     email:{
          type: String,
          required: true,
          trim: true,
          unique: true,
     },
     profilePic:{
          type: String,
          default:null
     },
     emailVerified:{
          type:Boolean,
          default:false
     },
     password:{
          type:String,
          required:true
     },
     emailVerificationToken:{
          type:String,
          unique:true
     },
     emailVerificationTokenExpiry:{
          type:Date,
          default: Date.now() + 3600000 // 1 hour expiry
     },
     resetPasswordToken:{
          type:String,
          default:null
     },
     resetPasswordTokenExpiry:{
          type:Date,
          default:null
     }
},{
     timestamps:true
});

const UserModel = mongoose.model("User",schema)

export default UserModel;
