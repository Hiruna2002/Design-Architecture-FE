import axios from 'axios';
import {  
  FolderKanban, 
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  imageUrl: string;
}

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
// }


const Dashboard = () => {

  useEffect(()=> {
    getAllProject();
    // getAllUsers();
  },[]);

      const [currentPage] = useState<'dashboard' | 'projects' | 'team' | 'users'>('dashboard');
      const navigate = useNavigate();
      const [projects, setProjets] = useState <Project[]>([]);
      // const [user, setUsers] = useState <User[]>([]);

      const getAllProject = async () => {
        try{
          const res = await axios.get('https://design-architecture-be.vercel.app/api/projects')
          setProjets(res.data);
        } catch(error){
          console.log(error)
        }
      }

      // const getAllUsers = async () => {
      //   try{
      //     const res = await axios.get('https://design-architecture-be.vercel.app/api/users')
      //     setUsers(res.data);
      //   } catch (error){
      //     console.log(error);
      //   }
      // }
    
    return(
        <div className="flex-1 overflow-auto p-6 md:p-8 space-y-8">
            {currentPage === 'dashboard' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Total Projects", value: projects.length, icon: FolderKanban, color: "#a3e635" },
                        { label: "Team Members", value: "4", icon: Users, color: "#a3e635" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#1e2937] rounded-3xl p-8 flex flex-col">
                        <div className="flex justify-between items-start">
                            <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                        </div>
                        <div className="mt-auto">
                            <div className="text-5xl font-bold tracking-tighter mt-6">{stat.value}</div>
                            <div className="text-slate-400 mt-1">{stat.label}</div>
                        </div>
                        </div>
                    ))}
                    </div>

                    <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Recent Projects</h2>
                        <button 
                        onClick={() => {
                            navigate("/admin/projects");
                        }}
                        className="text-[#a3e635] hover:underline text-sm flex items-center gap-1"
                        >
                        View all <span>→</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.isArray(projects)?(
                        projects.map((project) => (
                          <div key={project.id} className="bg-[#1e2937] rounded-3xl overflow-hidden">
                            <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                              <div className="font-semibold text-lg">{project.name}</div>
                            </div>
                        </div>
                        ))
                      ) : (
                        <p>No Projects Available</p>
                      )}
                        
                    </div>
                </div>
                </div>
            )}
        </div>
                
        )
    
}

export default Dashboard;


