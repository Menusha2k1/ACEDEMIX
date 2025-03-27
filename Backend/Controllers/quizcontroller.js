const axios = require('axios');
require('dotenv').config();
const Quiz = require('../Models/quiz_model');

const generateQuiz = async (req, res) => {
    const {lectureNotes} = req.body;

   
    console.log(lectureNotes);
    try {
        // 1. Verify API Key
        if (!process.env.DEEPSEEK_API_KEY) {
            throw new Error("API key not configured in environment variables");
        }

        // 2. Create a strict prompt
        const prompt = `Generate exactly 10 multiple choice questions in JSON format based on these prompt:
        ${lectureNotes}

        Return ONLY this exact JSON format with NO additional text or Markdown:
        {
          "title": " ... ",
          "questions": [
            {
              "question": "...",
              "options": ["A. Option1", "B. Option2", "C. Option3", "D. Option4"],
              "answer": "A",
              "explanation": "..."
            }
          ]
        }`;

        // 3. Make the API request
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "deepseek/deepseek-r1:free",
                messages: [
                    { 
                        role: "system", 
                        content: `You are a JSON quiz generator. STRICTLY return ONLY the requested JSON object with:
                        - Exactly 10 questions
                        - No additional commentary
                        - No Markdown formatting
                        - Valid JSON syntax
                        - All fields completed`
                    },
                    { 
                        role: "user", 
                        content: prompt 
                    }
                ],
                temperature: 0.3, // Lower temperature for more consistent results
                response_format: { type: "json_object" },
                max_tokens: 6000
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'Quiz Generator'
                },
                timeout: 30000
            }
        );

        // 4. Validate response structure
        if (!response.data?.choices?.[0]?.message?.content) {
            throw new Error("API response missing content");
        }

        // 5. Extract JSON content
        const rawContent = response.data.choices[0].message.content;
        let jsonString = rawContent;

        // Remove Markdown code blocks if present
        if (rawContent.includes('```json')) {
            const jsonMatch = rawContent.match(/```json([\s\S]*?)```/);
            if (jsonMatch) jsonString = jsonMatch[1].trim();
        } 
        // Extract JSON from text if needed
        else if (!rawContent.trim().startsWith('{')) {
            const jsonStart = rawContent.indexOf('{');
            const jsonEnd = rawContent.lastIndexOf('}') + 1;
            if (jsonStart >= 0 && jsonEnd > 0) {
                jsonString = rawContent.slice(jsonStart, jsonEnd);
            }
        }

        // 6. Parse and validate JSON
        let quizData;
        try {
            quizData = JSON.parse(jsonString);
            
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                throw new Error("Missing questions array in response");
            }
            
            if (quizData.questions.length !== 10) {
                throw new Error(`Expected 10 questions, got ${quizData.questions.length}`);
            }

            // Validate each question
            quizData.questions.forEach((q, i) => {
                if (!q.question || !q.options || !q.answer || !q.explanation) {
                    throw new Error(`Question ${i+1} missing required fields`);
                }
                if (q.options.length !== 4) {
                    throw new Error(`Question ${i+1} must have exactly 4 options`);
                }
            });

        } catch (parseError) {
            console.error("JSON Processing Failed:", {
                error: parseError.message,
                content: jsonString
            });
            throw new Error(`Quiz content validation failed: ${parseError.message}`);
        }

        // 7. Save to database
        const newQuiz = await Quiz.create({
            title: quizData.title || "Generated Quiz",
            questions: quizData.questions,
            source: "deepseek-r1"
        });

        return res.json({
            success: true,
            quiz: newQuiz,
            message: "Quiz generated successfully"
        });

    } catch (err) {
        console.error("Quiz Generation Error:", {
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            response: err.response?.data
        });

        return res.status(500).json({
            success: false,
            error: "Quiz generation failed",
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && {
                details: err.response?.data || err.stack
            })
        });
    }
};

module.exports = { generateQuiz };