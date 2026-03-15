import multer from "multer";
import path from "path";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from "../../config";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(process.cwd(), "/uploads"))
  },
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, `${file.fieldname}-${Math.random() * 1E9}`)
  },
})

export const uploadMulter = multer({ storage })


export const uploadToCloudinary = async () => {

  // cloudinary configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret // Click 'View API Keys' above to copy your API secret
  });


  // Upload an image
  const uploadResult: UploadApiResponse = await cloudinary.uploader
    .upload(
      path.join(process.cwd(), "/uploads/file-535289297.53310007"), {
      public_id: 'man',
    }
    )
    .catch((error) => {
      console.log(error);
    });


  console.log(uploadResult);
  return uploadResult.secure_url
}