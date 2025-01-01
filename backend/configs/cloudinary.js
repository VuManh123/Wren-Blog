require('dotenv').config();
const cloudinary = require('cloudinary').v2; // Thư viện xử lý upload hình ảnh

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = { cloudinary };
