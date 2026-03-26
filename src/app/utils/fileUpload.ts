import path from "path";
import multer from "multer";
import config from "../../config";
import { v2 as cloudinary } from 'cloudinary';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(process.cwd(), "/uploads"))
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, `${file.fieldname}-${Math.random() * 1E9}`)
  },
})

export const uploadMulter = multer({ storage })


export const uploadToCloudinary = async (file: Express.Multer.File) => {

  // cloudinary configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret // Click 'View API Keys' above to copy your API secret
  });



  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      file.path, {
      public_id: file.filename,
    }
    )
    .catch((error) => {
      console.log(error);
    });

  return uploadResult?.url || ''
}