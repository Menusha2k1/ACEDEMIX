import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

import { FaUsers, FaEdit, FaProjectDiagram } from "react-icons/fa";

const Home = () => {
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gray-50">
        {/* Left - Text */}
        <div className="w-full md:w-1/2 text-left pr-10">
          <h1 className="text-7xl font-bold tracking-wide leading-tight text-gray-900">
            The Happier Workspace
          </h1>
          <p className="text-2xl mt-6 text-gray-600">
            Take your notes and plan your days with Acedemix.
          </p>
          <button className="mt-8 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Right - Image */}
        <div className='w-full md:w-1/2 flex justify-center'>
            <img 
               className='w-3/4 border-none outline-none rounded-lg shadow-lg' 
               src={require('../../assets/pic-banner.webp')}  
               alt="Mind Mapping Preview"
            />
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20 px-10 text-center bg-gray-100">
        <h2 className="text-5xl font-semibold text-gray-900">Features</h2>
        <p className="text-xl text-gray-600 mt-4">
          Powerful tools to enhance your note-taking experience.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          <div className="p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
            <FaUsers className="text-5xl text-blue-500" />
            <h3 className="text-3xl font-semibold text-gray-900 mt-4">Live Collaboration</h3>
            <p className="text-lg text-gray-600 mt-2">Work together in real time with seamless sync.</p>
          </div>
          <div className="p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
            <FaEdit className="text-5xl text-green-500" />
            <h3 className="text-3xl font-semibold text-gray-900 mt-4">Rich Text Editing</h3>
            <p className="text-lg text-gray-600 mt-2">Format text, insert images, and style your notes effortlessly.</p>
          </div>
          <div className="p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
            <FaProjectDiagram className="text-5xl text-purple-500" />
            <h3 className="text-3xl font-semibold text-gray-900 mt-4">Mind Mapping</h3>
            <p className="text-lg text-gray-600 mt-2">Visualize your ideas with interactive mind maps.</p>
          </div>
        </div>
      </section>

      {/* Mind Map Preview Section */}
      <section className="py-20 px-10 bg-white text-center">
        <h2 className="text-5xl font-semibold text-gray-900">Visualize Your Thoughts</h2>
        <p className="text-xl text-gray-600 mt-4">
          Create dynamic mind maps effortlessly.
        </p>
        <div className="w-full flex justify-center mt-10">
          <img
            src="/assets/mindmap-preview.png"
            alt="Mind Map Preview"
            className="w-3/4 rounded-lg shadow-lg"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
