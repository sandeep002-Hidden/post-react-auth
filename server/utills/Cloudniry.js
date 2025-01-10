import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUDYNARY_NAME, 
  api_key: process.env.CLOUDYNARY_API_KEY, 
  api_secret: process.env.CLOUDYNARY_API_SECRET
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }
        const response =await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            folder: "StellerForge"
        })
        console.log("Uploaded Successfully",response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}
const deleteFromCloudinary=async(publicId)=>{
    try {
        const result=await cloudinary.uploader.destroy(publicId)
        console.log("deted from Cloudinary")
        return result
    } catch (error) {
        console.log("error in deleing Cloudinary",error)
        return null
    }
}

export {uploadOnCloudinary,deleteFromCloudinary}