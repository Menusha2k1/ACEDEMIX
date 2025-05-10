import React from 'react'
import Home from './pages/Home/home'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/signup'
import Quiz from './pages/Quiz/quiz'
import Image from './pages/ImageToText/imageToText'
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
        <Route path = "/pdf" exact element={<PdfUploader />} />
        <Route path = "/test" exact element={<Test />} />


     </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>
}

export default App
