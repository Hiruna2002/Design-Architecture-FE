import React from 'react'
import HomePage from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Common/NavBar'
import Footer from './components/Common/Footer'
import AboutPage from './pages/About'
import UserLayout from './components/Layout/UserLayout'
import ServicePage from './pages/Service'

const App = () => {
  return (
      <>
      <Navbar />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
        </Route>  
      </Routes>
      <Footer />
    </>
  )
}

export default App