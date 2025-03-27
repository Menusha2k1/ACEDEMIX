const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  questions: [{
    question: String,
    options: [String],
    answer: String,
    explanation: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);