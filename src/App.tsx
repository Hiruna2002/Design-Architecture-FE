import HomePage from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/About'
import UserLayout from './components/Layout/UserLayout'
import ServicePage from './pages/Service'
import ProjectsPage from './pages/Projects'
import ProcessPage from './pages/Process'
import ContactPage from './pages/Contact'
import Login from './pages/LoginPage'
import { SignUp } from './pages/SignupPage'
import Team from './pages/Team'

import AdminLayout from './components/Admin/AdminLayout'; 
import AdminProjects from './components/Admin/AdminProjects'; 
import AdminTeam from './components/Admin/AdminTeam';  
import AdminUsers from './components/Admin/AdminUsers'; 
import Dashboard from './components/Admin/Dashboard'
import AdminServices from './components/Admin/AdminServices'


const App = () => {
  return (
      <>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services/:id" element={<ServicePage />} />
        </Route>  
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path='services' element={<AdminServices />} />
        </Route>    
      </Routes>
    </>
  )
}

export default App