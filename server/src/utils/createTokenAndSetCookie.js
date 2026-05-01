import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY ,JWT_TOKEN_NAME} from "../config/config.js";

export const createTokenAndSetCookie = async(res,userId) =>{
     const token = await jwt.sign({userId},JWT_SECRET_KEY,{
          expiresIn:'7d'
     })

     res.cookie(JWT_TOKEN_NAME,token,{
          httpOnly:true,
          secure: process.env.MODE === "production",
          sameSite:"lax",
          maxAge: 1000*60*60*24*7 
     })

     return token;
}