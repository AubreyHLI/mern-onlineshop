const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const fs = require("fs");

// upload file to cloudinary 
async function uploadToCloudinary(locaFilePath, subFolderName, picWidth) {
    // locaFilePath: path of image which was just uploaded to "uploads" folder; subFolderName: name of image folder in cloudinary
    return cloudinary.uploader
        .upload(locaFilePath, { 
            folder: `mern-supermarket/${subFolderName}`,
            width: picWidth
            // crop: "scale"
        })
        .then(result => {
            // Image has been successfully uploaded on cloudinary, so remove local image file 
            fs.unlinkSync(locaFilePath);
            return {
                message: "Success",
                image: {
                    public_id: result.public_id,
                    url: result.secure_url
                },
            }
        })
        .catch(error => {
            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { 
                message: "Fail",
            }
        })  
}


module.exports = {
    uploadToCloudinary
};