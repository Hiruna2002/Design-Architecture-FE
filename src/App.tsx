import React from 'react'
import HomePage from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Common/NavBar'
import Footer from './components/Common/Footer'
import AboutPage from './pages/About'
import UserLayout from './components/Layout/UserLayout'

const App = () => {
  return (
    // <Router>
    //   {/* <div className="min-h-screen flex flex-col"> */}
    //     <Navbar />
    //     {/* <main className="flex-grow"> */}
    //       <Routes>
    //         <Route path="/" element={<HomePage />} />
    //       </Routes>
    //     {/* </main> */}
    //     <Footer />
    //   {/* </div> */}
    // </Router>

    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>  
      </Routes>
      <Footer />
    </>
  )
}

export default App