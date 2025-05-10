import React from 'react'
import Home from './pages/Home/home'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/signup'
import Quiz from './pages/Quiz/quiz'
import Image from './pages/ImageToText/imageToText'

import LiveNote from './pages/Notes/livenote'
import LiveCol from './pages/Notes/liveCol'
import ClassNotes from './pages/Notes/classNotes'
import MindMapping from './pages/Notes/mindmapping'
import MapGetStart from './pages/Notes/mapGetStart'
import MyNotes from './pages/Notes/myNotes'
import Notes from './pages/Notes/AddEditNotes'



import Calender from './pages/Events/Calender'

import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PdfUploader from './pages/pdfConverter/pdfUploader'
import Test from './pages/Home/test'
const routes = (
  <Router>
    <Routes>
        <Route path = "/" exact element={<Home />} />
        <Route path = "/login" exact element={<Login />} />
        <Route path = "/signup" exact element={<Signup />} />
        <Route path = "/quiz" exact element={<Quiz />} />
        <Route path = "/image-to-text" exact element={<Image />} />

        <Route path = "/livenote" exact element={<LiveNote />} />
        <Route path = "/liveCol" exact element={<LiveCol/>} />
        <Route path = "/classNotes" exact element={<ClassNotes/>} />
        <Route path = "/mindmapping" exact element={<MindMapping />} />
        <Route path = "/mapGetStart" exact element={<MapGetStart />} />
        <Route path = "/myNotes" exact element={<MyNotes />} />
        <Route path = "/notes" exact element={<Notes />} />

        <Route path = "/pdf" exact element={<PdfUploader />} />
        <Route path = "/test" exact element={<Test />} />
        <Route path = "/calender" exact element={<Calender />} />



     </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>
}

export default App
