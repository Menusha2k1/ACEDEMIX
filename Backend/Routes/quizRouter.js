const express = require('express');
const { generateQuiz, summerizer } = require('../Controllers/quizcontroller');

const router = express.Router();
router.post('/generate', generateQuiz);
router.post('/summerizer', summerizer)

module.exports = router;