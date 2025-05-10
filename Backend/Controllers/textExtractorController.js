const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const sharp = require('sharp');
require('dotenv').config();

const extractTextFromImage = async (imagePath) => {
  try {
    // 1. Enhance image for better OCR results
    await sharp(imagePath)
      .resize(2000)                  // Scale up for better readability
      .greyscale()                   // Convert to grayscale
      .normalise()                   // Adjust contrast
      .sharpen()                     // Enhance edges
      .toFile(`${imagePath}_processed.jpg`);

    // 2. Call DeepSeek OCR API
    const form = new FormData();
    form.append('image', fs.createReadStream(`${imagePath}_processed.jpg`));

    const response = await axios.post(
      'https://api.deepseek.ai/v1/ocr',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        timeout: 30000
      }
    );

    // 3. Clean up temporary files
    fs.unlinkSync(`${imagePath}_processed.jpg`);
    fs.unlinkSync(imagePath);

    return response.data.text;
  } catch (error) {
    console.error("OCR Error:", error.response?.data || error.message);
    throw new Error("Text extraction failed");
  }
};

module.exports = { extractTextFromImage };