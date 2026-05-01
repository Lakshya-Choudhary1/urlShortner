import cloudinary from "cloudinary";
import {CLOUDINARY_CLOUD_SECRET,CLOUDINARY_API_KEY} from "./config.js";

cloudinary.v2.config({
     cloud_name: "SHORTURLPROFILEPIC",
     api_key: CLOUDINARY_API_KEY,
     api_secret: CLOUDINARY_CLOUD_SECRET
})

//post a image to cloudinary.
export const uploadImageToCloudinary = async (image) => {
     try {

          //convert image to base64
          const base64Image = `data:image/jpeg;base64,${image.toString("base64")}`;

          const result = await cloudinary.v2.uploader.upload(base64Image, {
               folder: "urlShortner",
          });

          return result.secure_url;
     }
     catch (error) {
          console.log("Cloudinary Upload Error:", error);
          throw new Error("Failed to upload image to Cloudinary");
     }
}

//delete image from cloudinary by url
export const deleteImageFromCloudinary = async (imageUrl) => {
     try {
          const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.v2.uploader.destroy(`urlShortner/${publicId}`);
     }    
     catch (error) {
          console.log("Cloudinary Deletion Error:", error);
          throw new Error("Failed to delete image from Cloudinary");
     }
}


