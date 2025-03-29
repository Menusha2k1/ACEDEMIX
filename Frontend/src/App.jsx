import React from 'react'
import Home from './pages/Home/home'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/signup'
import Quiz from './pages/Quiz/quiz'
import Image from './pages/ImageToText/imageToText'
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";

const routes = (
  <Router>
    <Routes>
        <Route path = "/dashboard" exact element={<Home />} />
        <Route path = "/login" exact element={<Login />} />
        <Route path = "/signup" exact element={<Signup />} />
        <Route path = "/quiz" exact element={<Quiz />} />
        <Route path = "/image-to-text" exact element={<Image />} />

     </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>
}

export default App
