const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto",
            folder: 'blog-posts',
        })
        // console.log("Image Uploaded On Cloudinary",response,response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

module.exports = uploadOnCloudinary;