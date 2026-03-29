import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import envConfig from "../../config";

export const cloudinaryUploader = async (file: Express.Multer.File) => {

    // Configuration
    cloudinary.config({
        cloud_name: envConfig.cloud_name,
        api_key: envConfig.api_key,
        api_secret: envConfig.api_secret // Click 'View API Keys' above to copy your API secret
    });

    try {
        // Upload an image
        const result: UploadApiResponse = await cloudinary.uploader.upload(file.path, {
            public_id: file.filename
        })
        return result.secure_url || "";
    } catch (error) {
        console.log('Cloudinary Upload Error:', error);
        throw error;
    }

}