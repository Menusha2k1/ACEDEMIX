import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Abs from '../../assets/notes.jpg'
import pic from '../../assets/pic1.png'
import pic2 from '../../assets/pic2.png'
import pic4 from '../../assets/pic4.png'
import note from '../../assets/notes.png'
import sticky from '../../assets/sticky.png'
import calender from '../../assets/calender.png'
import pic3 from '../../assets/pic3.png'
import Footer from '../../components/Footer/footer'
import Slider from '../../components/Slideshow/slideshow'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (

    <div>
      <Navbar />
      <div className='bg-blue-300 -translate-x-2 top-0 left-0'></div>
      <Slider />
      <p className='text-center mt-10 text-4xl'>Our Features</p>
      <div className='mx-auto max-w-md flex items-center justify-center mt-15 mb-20 space-x-8'>
        <div className='border-2 bg-white border-gray-300 rounded-3xl hover:border-blue-500 hover:drop-shadow-2xl p-10 '>
          <img src={note} alt="" className=' top-7' />
          <p className='text-lg text-center  font-medium'>LiveNote</p>
        </div>
        <div className='border-2 bg-white border-gray-300 rounded-3xl hover:border-blue-500 hover:drop-shadow-2xl p-10 '>
          <img src={note} alt="" className=' top-7' />
          <p className='text-lg font-medium'>Sticky Notes</p>
        </div>
        <div className='border-2 bg-white border-gray-300 rounded-3xl hover:border-blue-500 hover:drop-shadow-2xl p-10 '>
          <img src={note} alt="" className=' top-7' />
          <p className='text-sm text-center font-medium'>Acedemic Reminder</p>
        </div>
        <div className='border-2 bg-white border-gray-300 rounded-3xl hover:border-blue-500 hover:drop-shadow-2xl p-10 ' onClick={() => navigate('/quiz')}>
          <img src={note} alt="" className=' top-7' />
          <p className='text-xl font-medium text-center' >AI quiz</p>
        </div>
  





      </div>
      <div className='bg-blue-200 flex justify-center items-center -translate-x-1/s  '>
        <div>
          <p className='text-blue-500 mx-auto flex justify-center drop-shadow-2xl w-200 pt-5 text-6xl wrap text-center content-center '>
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
