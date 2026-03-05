import {  
  FolderKanban, 
  Users, 
  UserCog, 
  Building2 
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  type: string;
  area: string;
  status: string;
  description: string;
  image: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  description: string;
  photo: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}


const Dashboard = () => {
      const [currentPage] = useState<'dashboard' | 'projects' | 'team' | 'users'>('dashboard');
      const navigate = useNavigate();

      const [projects] = useState<Project[]>([
          {
            id: 1,
            name: "Modern Villa - Colombo 07",
            type: "Residential",
            area: "2850 sq ft",
            status: "Ongoing",
            description: "Luxury 2-storey villa with rooftop pool and smart home integration.",
            image: "https://picsum.photos/id/1015/300/200"
          },
          {
            id: 2,
            name: "Eco Apartment Complex",
            type: "Residential",
            area: "12400 sq ft",
            status: "Completed",
            description: "Green-certified 4-storey apartment with solar panels.",
            image: "https://picsum.photos/id/133/300/200"
          },
          {
            id: 3,
            name: "Boutique Office - Galle Road",
            type: "Commercial",
            area: "6200 sq ft",
            status: "Ongoing",
            description: "Corporate headquarters with open-plan workspaces.",
            image: "https://picsum.photos/id/201/300/200"
          },
          {
            id: 4,
            name: "Beach House - Negombo",
            type: "Residential",
            area: "1950 sq ft",
            status: "Completed",
            description: "Contemporary beachfront villa with infinity pool.",
            image: "https://picsum.photos/id/1018/300/200"
          }
        ]);
      
        const [teamMembers] = useState<TeamMember[]>([
          {
            id: 1,
            name: "Dr. Kavindu Perera",
            role: "Principal Architect",
            email: "kavindu@archstudio.lk",
            description: "Good and very talanted",
            photo: "https://picsum.photos/id/64/300/300"
          },
          {
            id: 2,
            name: "Ayesha Fernando",
            role: "Lead Interior Designer",
            email: "ayesha@archstudio.lk",
            description: "Good and very talanted",
            photo: "https://picsum.photos/id/65/300/300"
          },
          {
            id: 3,
            name: "Rohan Silva",
            role: "Structural Engineer",
            email: "rohan@archstudio.lk",
            description: "Good and very talanted",
            photo: "https://picsum.photos/id/66/300/300"
          }
        ]);
      
        const [users] = useState<User[]>([
          {
            id: 1,
            name: "Nimal Perera",
            email: "nimal.client@gmail.com",
            role: "Client",
            status: "Active"
          },
          {
            id: 2,
            name: "Shalini Wijesinghe",
            email: "shalini.w@gmail.com",
            role: "Client",
            status: "Active"
          },
          {
            id: 3,
            name: "Chamath Gunawardena",
            email: "chamath@outlook.com",
            role: "Client",
            status: "Inactive"
          }
        ]);

    const getStatusBadge = (status: string) => {
        if (status === 'Completed' || status === 'Active') {
            return 'bg-emerald-500 text-black';
        }
        return 'bg-amber-500 text-black';
    };
    
    return(
        <div className="flex-1 overflow-auto p-6 md:p-8 space-y-8">
            {currentPage === 'dashboard' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Total Projects", value: projects.length, icon: FolderKanban, color: "#a3e635" },
                        { label: "Team Members", value: teamMembers.length, icon: Users, color: "#a3e635" },
                        { label: "Active Clients", value: users.filter(u => u.status === 'Active').length, icon: UserCog, color: "#a3e635" },
                        { label: "Completed Plans", value: projects.filter(p => p.status === 'Completed').length, icon: Building2, color: "#a3e635" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#1e2937] rounded-3xl p-8 flex flex-col">
                        <div className="flex justify-between items-start">
                            <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                            <div className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">+12%</div>
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
                        {projects.slice(0, 3).map(project => (
                        <div key={project.id} className="bg-[#1e2937] rounded-3xl overflow-hidden">
                            <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                            <div className="font-semibold text-lg">{project.name}</div>
                            <div className="text-slate-400 text-sm mt-1">{project.area} BR</div>
                            <div className={`inline-block mt-4 px-4 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                                {project.status}
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                </div>
            )}
        </div>
                
        )
    
}

export default Dashboard;


