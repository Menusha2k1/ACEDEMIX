const axios = require('axios');
const FormData = require('form-data');

exports.extractTextFromPdf = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No PDF file uploaded'
            });
        }

        const PDF_CO_API_KEY = 'thathsaramenusha2001@gmail.com_R652m0KTwHxvrcPv68uC4vIZ5mhzmdN0R8OXodjupBxbGQjdA7D9e2Mr6QHIFO7F';

        // Step 1: Upload file to PDF.co temporary storage
        const uploadFormData = new FormData();
        uploadFormData.append('file', req.file.buffer, {
            filename: req.file.originalname || 'document.pdf',
            contentType: req.file.mimetype || 'application/pdf'
        });

        const uploadResponse = await axios.post(
            'https://api.pdf.co/v1/file/upload',
            uploadFormData,
            {
                headers: {
                    ...uploadFormData.getHeaders(),
                    'x-api-key': PDF_CO_API_KEY
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        if (uploadResponse.data.error) {
            throw new Error(uploadResponse.data.message);
        }

        // Step 2: Convert PDF to text using the uploaded file URL
        const convertResponse = await axios.post(
            'https://api.pdf.co/v1/pdf/convert/to/text',
            {
                url: uploadResponse.data.url, // Use the uploaded file URL
                async: false,
                pages: "0-",
                inline: true
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': PDF_CO_API_KEY
                }
            }
        );

        if (convertResponse.data.error) {
            throw new Error(convertResponse.data.message);
        }

        // Return the extracted text
        res.status(200).json({
            success: true,
            text: convertResponse.data.body
        });

    } catch (error) {
        console.error('PDF processing error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to process PDF'
        });
    }
};