import { useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/axiosInstance';
import Navbar from "../../components/Navbar/navbar";
import { BsStars } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



export default function QuizApp() {
    const [lectureNotes, setLectureNotes] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const generateQuiz = async () => {
        setLoader(true);
        try {
            const response = await axiosInstance.post("/api/quiz/generate", {
                lectureNotes
            }, {
                timeout: 60000
            });

            setQuiz(response.data.quiz);
            setAnswers({});
            setSubmitted(false);
        } catch (error) {
            console.error("Error generating quiz:", error);
        } finally {
            setLoader(false);
        }
    };

    const handleAnswerChange = (questionIndex, selectedOption) => {
        setAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
    };

    const submitQuiz = () => {
        let correctAnswers = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setSubmitted(true);
    };

    // Helper function to determine answer styling
    const getAnswerStyle = (questionIndex) => {
        if (!submitted) return {};

        const isCorrect = answers[questionIndex] === quiz.questions[questionIndex].answer;
        return {
            color: isCorrect ? 'green' : 'red',
            fontWeight: 'bold'
        };
    };

    return (
        <div className="max-w-2xl mx-auto p-6 mt-20">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4 flex">
                <BsStars />
                AI-Generated Quiz
            </h1>
            <textarea
                className="w-full border p-2 rounded"
                rows="4"
                placeholder="Enter lecture notes here..."
                value={lectureNotes}
                onChange={(e) => setLectureNotes(e.target.value)}
            ></textarea>

            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex"
                onClick={generateQuiz}
                disabled={loader}
            >
                <BsStars /> Generate Quiz 
            </button>

            {loader && (
                <div>
                    <div className="flex mt-20 animate-pulse items-center justify-center text-3xl text-blue-400">
                        <BsStars />Generating Quiz<BsStars /> ....
                    </div>
                </div>
            )}

            {quiz && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">{quiz.title}</h2>
                    {quiz.questions.map((q, index) => (
                        <div key={index} className="mt-4 border p-4 rounded">
                            <p className="font-semibold">{q.question}</p>
                            {q.options.map((option, optionIndex) => (
                                <label key={optionIndex} className="block mt-2">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option[0]}
                                        onChange={() => handleAnswerChange(index, option[0])}
                                        disabled={submitted}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={submitQuiz}
                        disabled={submitted}
                    >
                        {submitted ?  "Generate New Quiz": "Submit Quiz"}
                    </button>
                    <button className="mt-4 bg-blue-400 text-white px-4 py-2 rounded flex" onClick={() => navigate('/dashboard')}><BsStars />Generate new quiz</button>
                    {submitted && (
                        <div className="mt-4 p-4 border rounded">
                            <h3 className="text-lg font-bold flex">
                                <FaMedal
                                    size={25}
                                    className="mr-5" />
                                Your Score: {score} / {quiz.questions.length}</h3>
                            <h4 className="mt-2 font-semibold">Explanations:</h4>
                            {quiz.questions.map((q, index) => (
                                <p
                                    key={index}
                                    className="mt-2 flex"
                                    style={getAnswerStyle(index)}
                                >
                                    <strong>Q{index + 1}: </strong>
                                    {q.explanation}
                                    {answers[index] === q.answer ? (
                                        <span className="ml-2"><FaCheckSquare /></span>
                                    ) : (
                                        <span className="ml-2 "><FaWindowClose /></span>
                                    )}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}