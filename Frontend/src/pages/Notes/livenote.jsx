import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import RichTextEditor from '../../components/RichTextEditor/richtesteditor';
import VideoFile from '../../assets/notes.mp4'; // Ensure the path is correct
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gray-50">
        
        {/* Left - Topic */}
        <div className="w-full md:w-1/3 text-left pr-10">
          <h1 className="text-6xl font-bold tracking-wide leading-tight text-gray-900">
            Build Perfect Docs, Together
          </h1>
          <p className="text-lg mt-4 text-gray-600">
            Work with your team in real time using the Live Collaboration Editor.
          </p>
        </div>

        {/* Right - Video & Live Collaboration Editor */}
        <div className="w-full md:w-2/3 flex flex-col items-center">
          {/* Auto-playing Video with smaller height */}
          <video 
            className="w-full max-w-3xl h-[250px] rounded-lg shadow-lg object-cover"  // Reduced height
            src={VideoFile} 
            autoPlay 
            loop 
            muted 
            playsInline 
            loading="lazy"  // Optimized loading
          ></video>

          {/* Rich text Editor */}
          <RichTextEditor />
        </div>
     
      </section>

      {/* Features Section */}
      <section className="py-20 px-10 text-center bg-white">
        <h2 className="text-5xl font-semibold">Features</h2>
        <p className="text-lg text-gray-600 mt-4">Enhance your note-taking experience.</p>
        
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Mind Mapping Card */}
          <div className="p-6 shadow-md rounded-lg bg-gray-100" onClick={() => navigate('/mindmapping')}>
            <h3 className="text-2xl font-semibold">Mind Mapping</h3>
            <p className="text-gray-600 mt-2">Visualize your ideas and structure your thoughts easily.</p>
          </div>
          {/* Visual Notes Card */}
          <div className="p-6 shadow-md rounded-lg bg-gray-100">
            <h3 className="text-2xl font-semibold">Visual Notes</h3>
            <p className="text-gray-600 mt-2">Create engaging, structured notes with ease.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
