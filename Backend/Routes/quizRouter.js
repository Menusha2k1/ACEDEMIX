const express = require('express');
const { generateQuiz } = require('../Controllers/quizcontroller');

const router = express.Router();
router.post('/generate', generateQuiz);

module.exports = router;