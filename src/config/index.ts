import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envConfig = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    bcrypt_salt: process.env.BCRYPT_SALT,
    database_url: process.env.DATABASE_URL,

    // cloudinary
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
    // jwt
    jwt_access_key: process.env.JWT_ACCESS_KEY,
    jwt_refresh_key: process.env.JWT_REFRESH_KEY
}

export default envConfig;