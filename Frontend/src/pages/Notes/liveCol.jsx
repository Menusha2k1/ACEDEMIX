import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import LiveColEditor from '../../components/liveColEditor/liveColEditor';
import VideoFile from '../../assets/friends.mp4'; // Ensure the path is correct

const Home = () => {
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gray-50">
        
        {/* Left - Topic & Link Sharing */}
        <div className="w-full md:w-1/3 text-left pr-10">
          <h1 className="text-6xl font-bold tracking-wide leading-tight text-gray-900">
            Build Perfect Docs, Together
          </h1>
          <p className="text-lg mt-4 text-gray-600">
            Work with your team in real time using the Live Collaboration Editor.
          </p>

          {/* Link Sending Box */}
          <div className="mt-6">
            <input 
              type="text" 
              placeholder="Enter email or link to invite" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-4 w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">
              Send Invite
            </button>
          </div>

          {/* Online Friends */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">Online Friends</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                <p className="text-lg text-gray-700">Alex Johnson</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                <p className="text-lg text-gray-700">Emily Carter</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                <p className="text-lg text-gray-700">Michael Smith</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Video & Live Collaboration Editor */}
        <div className="w-full md:w-2/3 flex flex-col items-center">
          
          {/* Auto-playing Video with smaller height */}
          <video 
            className="w-full max-w-lg h-[250px] rounded-lg shadow-lg object-cover"  // Reduced height
            src={VideoFile} 
            autoPlay 
            loop 
            muted 
            playsInline 
            loading="lazy"  // Optimized loading
          ></video>

          {/* Live Collaboration Editor */}
          <LiveColEditor />
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default Home;
