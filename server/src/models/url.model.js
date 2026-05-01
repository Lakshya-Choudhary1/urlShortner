import mongoose from "mongoose";

const schema = new mongoose.Schema({
     userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"User",
          default:null
     },
     originalUrl: {
          type: String,
          required: true,
          trim: true
     },
     shortUrl:{
          type:String,
          index:true,
          required:true,
          unique:true,
     },
     clicks:{
          type:Number,
          default:0,
     },
     expiresAt:{
          type: Date,
     },
     isActive:{
          type:Boolean,
          default:true,
     },
     isPremium:{
          type:Boolean,
          default:false,
     }
},{
     timestamps:true,    
});

const UrlModel =  mongoose.model("Url", schema);

export default UrlModel;