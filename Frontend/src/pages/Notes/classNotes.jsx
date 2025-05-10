import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import VideoFile from '../../assets/presentation.mp4'; // Ensure correct file placement
import {  FaUsers, FaEdit, FaBrain } from 'react-icons/fa';

const Home = () => {
  return (
    <div className='font-sans'>
      <Navbar />
      
      {/* Hero Section */}
      <section className='flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gray-50'>
        
        {/* Left - Text */}
        <div className='w-full md:w-1/2 text-left pr-10'>
          <h1 className='text-7xl font-bold tracking-wide leading-tight text-gray-900'>
            The Happier Workspace
          </h1>
          <p className='text-2xl mt-6 text-gray-600'>
            Take your notes and plan your days with Acedemix.
          </p>
          <button className='mt-8 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition'>
            Get Started
          </button>
        </div>

        {/* Right - Video */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <video 
            className='w-3/4 border-none outline-none rounded-lg shadow-lg' 
            src={VideoFile} 
            autoPlay 
            loop 
            muted 
            playsInline 
          />
        </div>

      </section>
      
      {/* Features Section */}
            <section className="py-20 px-6 text-center">
              <h2 className="text-4xl font-semibold text-gray-900">Features</h2>
              <p className="text-lg text-gray-600 mt-4">Powerful tools to enhance your note-taking experience.</p>
      
              <div className="grid md:grid-cols-3 gap-10 mt-10">
                <div className="p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
                  <FaUsers className="text-blue-500 text-4xl" />
                  <h3 className="text-2xl font-semibold text-gray-900 mt-2">Live Collaboration</h3>
                  <p className="text-gray-600 mt-2">Work together in real-time with seamless sync.</p>
                </div>
                <div className="p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
                  <FaEdit className="text-green-500 text-4xl" />
                  <h3 className="text-2xl font-semibold text-gray-900 mt-2">Rich Text Editing</h3>
                  <p className="text-gray-600 mt-2">Format text, insert images, and style your notes effortlessly.</p>
                </div>
                <div className="p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
                  <FaBrain className="text-purple-500 text-4xl" />
                  <h3 className="text-2xl font-semibold text-gray-900 mt-2">Mind Mapping</h3>
                  <p className="text-gray-600 mt-2">Visualize your ideas with interactive mind maps.</p>
                </div>
              </div>
            </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
