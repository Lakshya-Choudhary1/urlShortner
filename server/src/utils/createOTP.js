import {nanoid} from "nanoid";

export default async() =>{
     const otp = await nanoid(4);
     return otp;
}

