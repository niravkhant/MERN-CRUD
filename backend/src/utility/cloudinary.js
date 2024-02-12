import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadOnCloudinary = async function(localFilePath){
    try {
        if(!localFilePath) return null;
        // file upload on cloudinary
       const response =  await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        // file has been uploded
        console.log("File has been uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove locally save temp file as the upload failed.
        console.log("File Upload Error:510 File Upload failed on cloudinary", error);
        return null;
    }
}