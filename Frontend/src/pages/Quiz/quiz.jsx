import { useState, useRef } from "react";
import axiosInstance from '../../utils/axiosInstance';
import Navbar from "../../components/Navbar/navbar";
import { BsStars } from "react-icons/bs";
import { FaMedal, FaWindowClose, FaCheckSquare } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners'

export default function QuizApp() {
    const [lectureNotes, setLectureNotes] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [summerize, setSummerize] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loader, setLoader] = useState(false);
    const [pdfLoader, setPdfloader] = useState(false);
    const [plainSummary, setPlainSummary] = useState(""); // new state


    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const summerizer = async () => {
        setLoader(true);
        setError("");
        setQuiz(null);
        setSubmitted(false);
        setScore(0);

        // Clean lecture notes before sending to backend
        const cleanedText = lectureNotes
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n')
            .replace(/\s{2,}/g, ' ');

        try {
            const response = await fetch('http://localhost:4000/api/quiz/summerizer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lectureNotes: cleanedText })
            });

            const data = await response.json();

            const summaryWithMarkup = data.summary;
            const cleanedSummary = summaryWithMarkup
                .replace(/\*\*/g, '') // remove **
                .split('^')
                .map(line => line.trim())
                .filter(Boolean)
                .join('. ') + '.';

            setSummerize(summaryWithMarkup);   // for display with bold and bullets
            setPlainSummary(cleanedSummary);   // clean version for quiz generation
        } catch (error) {
            console.error("Summarization failed:", error);
            setSummerize("Failed to summarize.");
        } finally {
            setLoader(false);
        }
    };

    const generateQuiz = async () => {
        setLoader(true);
        setError("");
        setSummerize(null);

        try {
            const response = await axiosInstance.post("/api/quiz/generate", {
                lectureNotes: plainSummary
            }, {
                timeout: 600000
            });

            setQuiz(response.data.quiz);
            setAnswers({});
            setSubmitted(false);
        } catch (error) {
            console.error("Error generating quiz:", error);
            setError("Failed to generate quiz. Please try again.");
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

    const getAnswerStyle = (questionIndex) => {
        if (!submitted) return {};
        const isCorrect = answers[questionIndex] === quiz.questions[questionIndex].answer;
        return {
            color: isCorrect ? 'green' : 'red',
            fontWeight: 'bold'
        };
    };

    const handleFileChange = async (e) => {
        setPdfloader(true);
        const selectedFile = e.target.files[0];
        if (!selectedFile || selectedFile.type !== "application/pdf") {
            setError("Please upload a valid PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", selectedFile);

        try {
            const response = await axiosInstance.post("/api/convert/pdf", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setLectureNotes(response.data.text || "");
        } catch (err) {
            console.error("PDF upload failed", err);
            setError("Failed to extract text from PDF.");
        }
        finally {
            setPdfloader(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 mt-80 mb-70">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BsStars />
                SmartRevise            </h1>


            <div className="bg-blue-200 flex rounded-2xl p-2">
                <textarea
                    className="w-full border-0 p-2 rounded "
                    rows="4"
                    placeholder="Enter Any topic here or upload a PDF..."
                    value={lectureNotes}
                    // style={{ display: "none" }}
                    onChange={(e) => setLectureNotes(e.target.value)}
                />
                <MdAttachFile
                    className="p-2 cursor-pointer text-gray-600 hover:text-black"
                    size={40}
                    onClick={() => fileInputRef.current.click()}
                />
            </div>

            <div className="flex items-center mt-2 gap-2">

                {pdfLoader && <div className="flex">Converting<ScaleLoader height={20} color="#2ed21b" /></div>}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

            </div>

            {error && <div className="mt-2 text-red-600">{error}</div>}

            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
                onClick={summerizer}
                disabled={loader}
            >
                <BsStars /> {loader ? 'Summerizing' : 'Summerize'}
            </button>


            {summerize && (
                <div className="my-4">
                    <h2 className="text-lg font-semibold">Summary</h2>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {summerize
                            .split('^')
                            .map((sentence, index) => sentence.trim())
                            .filter(Boolean)
                            .map((sentence, index) => {
                                // Replace $$text$$ with <strong>text</strong>
                                const parts = sentence.split(/(\*\*[^*]+\*\*)/g); // keep $$ parts as separate elements
                                return (
                                    <li key={index}>
                                        {parts.map((part, i) =>
                                            part.startsWith('**') && part.endsWith('**') ? (
                                                <strong key={i}>{part.slice(2, -2)}</strong>
                                            ) : (
                                                <span key={i}>{part}</span>
                                            )
                                        )}
                                        .
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            )}
            {!summerize ? <></>
                : <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={generateQuiz}>
                    quiz
                </button>}


            {loader && (
                <div className="flex mt-20 animate-pulse items-center justify-center text-3xl text-blue-400">
                    <BsStars /> Generating Quiz <BsStars />
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
                        {submitted ? "Generate New Quiz" : "Submit Quiz"}
                    </button>

                    <button
                        className="mt-4 ml-4 bg-blue-400 text-white px-4 py-2 rounded flex items-center gap-2"
                        onClick={() => navigate('/dashboard')}
                    >
                        <BsStars /> Go to Dashboard
                    </button>

                    {submitted && (
                        <div className="mt-4 p-4 border rounded">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <FaMedal size={25} />
                                Your Score: {score} / {quiz.questions.length}
                            </h3>
                            <h4 className="mt-2 font-semibold">Explanations:</h4>
                            {quiz.questions.map((q, index) => (
                                <p
                                    key={index}
                                    className="mt-2 flex items-center gap-2"
                                    style={getAnswerStyle(index)}
                                >
                                    <strong>Q{index + 1}: </strong>
                                    {q.explanation}
                                    {answers[index] === q.answer ? (
                                        <FaCheckSquare />
                                    ) : (
                                        <FaWindowClose />
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
