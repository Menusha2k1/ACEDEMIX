import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import pic from '../../assets/pic1.png'
import pic2 from '../../assets/pic2.png'
import pic4 from '../../assets/pic4.png'

import pic3 from '../../assets/pic3.png'
import Footer from '../../components/Footer/footer'
import Slider from '../../components/Slideshow/slideshow'
import { useNavigate } from 'react-router-dom';
import { LuNotebookPen } from "react-icons/lu";
import { FaRegStickyNote } from "react-icons/fa";
import { BsCalendar2Date, BsStars } from "react-icons/bs";





const Home = () => {
  const navigate = useNavigate();

  return (

    <div>
      <Navbar />
      <div className="relative bg-blue-300 max-w-full h-120 -translate-y-8">
        <div className="absolute bg-blue-300 w-400 h-400 rotate-x-104 rounded-full transform -translate-y-80 -translate-x-10 "></div>
        <Slider />

      </div>


      <p className='text-center mt-70 text-4xl font-extrabold'>Our Features</p>
      <div className=" gap-6 lg:grid-cols-4 justify-center items-center grid mx-30 mt-10 mb-30 font-bold text-xl text-blue-900">
        <div className='bg-blue-200 p-5 rounded-2xl items-center justify-center flex gap-3 hover:border-2 hover:border-blue-900'onClick={() => navigate('/livenote')}>
          Live Note
          <LuNotebookPen
            size={30}
          />

        </div>
        <div className='bg-blue-200 p-5 rounded-2xl items-center justify-center flex gap-3 hover:border-2 hover:border-blue-900'>
          Sticky Notes
          <FaRegStickyNote
            size={30} />

        </div>
        <div className='bg-blue-200 p-5 rounded-2xl items-center justify-center flex gap-3 hover:border-2 hover:border-blue-900'onClick={() => navigate('/calender')}>
          Acedemic Reminder
          <BsCalendar2Date
            size={30} />


        </div>
        <div className='bg-blue-200 p-5 rounded-2xl items-center justify-center flex gap-2 hover:border-2 hover:border-blue-900' onClick={() => navigate('/test')}>
          Smart Revise
          <BsStars
            size={30} />

        </div>
      </div>
      <div className='bg-blue-200 flex justify-center items-center -translate-x-1'>
        <div>
          <p className='text-blue-500 font-extrabold mx-auto flex justify-center drop-shadow-2xl w-200 pt-5 text-6xl wrap text-center content-center '>
            Bring your note-taking to the next level with ACEDEMIX
          </p>
          <button className='bg-blue-600 w-50 text-white text-xl p-3 rounded-2xl mt-10 ml-75 hover:opacity-50'>Start Note</button>
        </div>
        <div className=''>
          <img className=' w-150 pr-10 pt-10 ' src={pic} alt="" />
        </div>

      </div>
      <div className='flex mt-10 justify-center items-center'>
        <img className='w-180 pr-10 pt-15 ' src={pic2} alt="" />
        <span className='bg-blue-100 h-100 w-120 mt-20 p-10 rounded-2xl'>
          <p className='text-5xl pt-2 text-center font-bold'>Live-Note Tacking</p>
          <p className='text-center text-3xl mt-5'>Jot down lecture notes in real-time with our rich text editor.</p>
        </span>
      </div>

      <div className='flex mt-10 justify-center items-center space space-x-10'>

        <span className='bg-green-100 h-100 w-120 mt-20 p-10 rounded-2xl'>
          <p className=' text-5xl pt-2 text-center font-bold'>Sticky-Notes</p>
          <p className='text-center text-3xl mt-5'>Create quick reminders and to-do lists with color-coded sticky notes.</p>
        </span>
        <img className='w-150 pr-10 pt-15 mb-10 ' src={pic3} alt="" />
      </div>

      <div className='flex mt-10 justify-center items-center space space-x-10'>
        <img className='w-150 pr-10 pt-15 mb-10 ' src={pic4} alt="" />
        <span className='bg-green-100 h-100 w-120 mt-20 p-10 rounded-2xl'>
          <p className=' text-5xl pt-2 text-center font-bold'>Academic Reminders </p>
          <p className='text-center text-3xl mt-5'>Never miss a deadline again! Set reminders for exams and assignments</p>
        </span>

      </div>


      <Footer />
    </div>
  )
}

export default Home
