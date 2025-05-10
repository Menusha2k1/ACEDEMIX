const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfController = require('../Controllers/pdfController');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/pdf', upload.single('pdf'), pdfController.extractTextFromPdf);

module.exports = router;