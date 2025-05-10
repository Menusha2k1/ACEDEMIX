import { useRef } from "react";
import Quiz from '../Quiz/quiz'
import Man from '../../assets/man.png'
import { FaArrowRight } from "react-icons/fa";


function test() {
    const targetRef = useRef(null);

    const scrollToComponent = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="">
            <div className="relative bg-blue-300 max-w-full h-180 ">
            <div className="absolute bg-blue-300 w-400 h-400 rotate-x-120 rounded-full -translate-y-40 -translate-x-10 "></div>

                <div className="absolute bg-blue-800 w-500 rotate-155 h-130  transform translate-y-0 translate-x-20 rounded-full "></div>
                <div className="absolute bg-green-600 w-120 h-120 rounded-full translate-y-30 translate-x-50 "></div>

                <img className="absolute transform translate-y-20 translate-x-50 drop-shadow-2xl" src={Man} alt="" width={450}/>
                <div className="absolute translate-y-30 w-100  text-wrap translate-x-210 transform text-white mr-2 ">
                    <h1 className="text-5xl mb-2 font-extrabold">SmartRevise</h1>
                    <h3 className="text-2xl mb-2 font-bold">Welcome to SmartRevise</h3>
                    <h5 className="text-pretty">Turn your long and overwhelming lecture notes into short, clear summaries and AI-generated quizzes all in one click!
                        Simply upload your lecture PDF or paste your notes, and let SmartRevise help you understand, retain, and test your knowledge — fast and effectively.
                        Perfect for quick revision before exams or making sure you really understood the material. Ready to supercharge your study time?</h5>
                </div>
                <button
                    onClick={scrollToComponent}
                    className="absolute flex text-xl bg-white text-blue-800 px-8 py-4 rounded mt-4 transform translate-x-210 translate-y-120 shadow-2xl font-bold hover:bg-blue-400 hover:text-white"
                >

                    Start Revision
                    <FaArrowRight 
                    className="mt-1 ml-1"/>
                </button>


            </div>



            {/* Other content here */}

            <div ref={targetRef} className="mt-5">
                <Quiz />      </div>
        </div>
    );
}
export default test;