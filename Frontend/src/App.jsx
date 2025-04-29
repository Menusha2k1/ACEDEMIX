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

import {BrowserRouter as Router,Routes,Route } from "react-router-dom";

const routes = (
  <Router>
    <Routes>
        <Route path = "/dashboard" exact element={<Home />} />
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

     </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>
}

export default App
