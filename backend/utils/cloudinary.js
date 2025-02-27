const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
    cloud_name: 'doccvn7gq', 
    api_key: '522256776131354', 
    api_secret: 'l63d3Ml6s1kI8knBKzcztIukA6s' 
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