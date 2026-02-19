import HomePage from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Common/NavBar'
import Footer from './components/Common/Footer'
import AboutPage from './pages/About'
import UserLayout from './components/Layout/UserLayout'
import ServicePage from './pages/Service'
import ProjectsPage from './pages/Projects'
import ProcessPage from './pages/Process'
import ContactPage from './pages/Contact'

const App = () => {
  return (
      <>
      <Navbar />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>  
      </Routes>
      <Footer />
    </>
  )
}

export default App