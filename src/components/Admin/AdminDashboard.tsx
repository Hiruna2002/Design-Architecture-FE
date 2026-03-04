import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  UserCog, 
  Plus, 
  Edit2, 
  Trash2, 
  Menu, 
  X, 
  Home, 
  Building2 
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  type: string;
  area: string;
  bedrooms: number;
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

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'projects' | 'team' | 'users'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Modern Villa - Colombo 07",
      type: "Residential",
      area: "2850 sq ft",
      bedrooms: 5,
      status: "Ongoing",
      description: "Luxury 2-storey villa with rooftop pool and smart home integration.",
      image: "https://picsum.photos/id/1015/300/200"
    },
    {
      id: 2,
      name: "Eco Apartment Complex",
      type: "Residential",
      area: "12400 sq ft",
      bedrooms: 24,
      status: "Completed",
      description: "Green-certified 4-storey apartment with solar panels.",
      image: "https://picsum.photos/id/133/300/200"
    },
    {
      id: 3,
      name: "Boutique Office - Galle Road",
      type: "Commercial",
      area: "6200 sq ft",
      bedrooms: 0,
      status: "Ongoing",
      description: "Corporate headquarters with open-plan workspaces.",
      image: "https://picsum.photos/id/201/300/200"
    },
    {
      id: 4,
      name: "Beach House - Negombo",
      type: "Residential",
      area: "1950 sq ft",
      bedrooms: 4,
      status: "Completed",
      description: "Contemporary beachfront villa with infinity pool.",
      image: "https://picsum.photos/id/1018/300/200"
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
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

  const [users, setUsers] = useState<User[]>([
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

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'team' | 'user' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const openModal = (type: 'project' | 'team' | 'user', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      if (type === 'project') {
        setFormData({
          name: '',
          type: 'Residential',
          area: '',
          status: 'Ongoing',
          description: '',
          image: ''
        });
      } else if (type === 'team') {
        setFormData({
          name: '',
          role: 'Architect',
          email: '',
          phone: '',
          photo: ''
        });
      } else {
        setFormData({
          name: '',
          email: '',
          role: 'Client',
          status: 'Active'
        });
      }
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalType === 'project') {
      if (editingItem) {
        setProjects(prev => prev.map(p => p.id === editingItem.id ? { ...formData, id: p.id } : p));
      } else {
        setProjects(prev => [...prev, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'team') {
      if (editingItem) {
        setTeamMembers(prev => prev.map(m => m.id === editingItem.id ? { ...formData, id: m.id } : m));
      } else {
        setTeamMembers(prev => [...prev, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'user') {
      if (editingItem) {
        setUsers(prev => prev.map(u => u.id === editingItem.id ? { ...formData, id: u.id } : u));
      } else {
        setUsers(prev => [...prev, { ...formData, id: Date.now() }]);
      }
    }

    closeModal();
  };

  const handleDelete = (type: string, id: number) => {
    if (!confirm(`Delete this ${type}?`)) return;

    if (type === 'project') {
      setProjects(prev => prev.filter(p => p.id !== id));
    } else if (type === 'team') {
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    } else if (type === 'user') {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  // Status Badge
  const getStatusBadge = (status: string) => {
    if (status === 'Completed' || status === 'Active') {
      return 'bg-emerald-500 text-black';
    }
    return 'bg-amber-500 text-black';
  };

  return (
    <>
    
    
    
    
    <div className="flex h-screen overflow-hidden bg-[#0f172a] text-white font-sans">
      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#1e2937] border-r border-slate-700 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#a3e635] rounded-2xl flex items-center justify-center">
              <Home className="w-6 h-6 text-[#0f172a]" />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tight">PlanArch</div>
              <div className="text-xs text-slate-400 -mt-1">Studio Admin</div>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { key: 'projects', label: 'Projects', icon: FolderKanban },
            { key: 'team', label: 'Team Members', icon: Users },
            { key: 'users', label: 'Users', icon: UserCog },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key as any);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${isActive 
                  ? 'bg-[#a3e635] text-[#0f172a] font-semibold' 
                  : 'hover:bg-slate-700 text-slate-300'}`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="bg-[#0f172a] rounded-3xl p-4 text-center">
            <div className="text-xs text-slate-400 mb-1">Need help?</div>
            <div className="text-sm font-medium">Contact Super Admin</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#1e2937] border-b border-slate-700 flex items-center px-6 justify-between z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-semibold text-xl md:text-2xl capitalize">
              {currentPage === 'dashboard' && 'Overview'}
              {currentPage === 'projects' && 'All Projects'}
              {currentPage === 'team' && 'Team Members'}
              {currentPage === 'users' && 'System Users'}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-[#0f172a] rounded-3xl px-5 py-2 text-sm border border-slate-600">
              <span className="text-slate-400">Welcome back,</span>
              <span className="ml-1.5 font-medium">Admin</span>
            </div>

            <div className="w-9 h-9 bg-[#a3e635] rounded-2xl flex items-center justify-center text-[#0f172a] font-bold cursor-pointer">
              AP
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 space-y-8">
          {/* DASHBOARD */}
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
                      setCurrentPage('projects');
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
                        <div className="text-slate-400 text-sm mt-1">{project.area} • {project.bedrooms} BR</div>
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
          {/* ------------------------------------------------------- */}
                  {/* PROJECTS SECTION */}
          {/* ------------------------------------------------------- */}

          {currentPage === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-3xl font-bold">Projects</div>
                  <div className="text-slate-400">Manage house plans &amp; architecture projects</div>
                </div>
                <button 
                  onClick={() => openModal('project')}
                  className="flex items-center gap-3 bg-[#a3e635] hover:bg-[#84cc16] transition text-[#0f172a] font-semibold px-8 py-3.5 rounded-2xl"
                >
                  <Plus className="w-5 h-5" />
                  New Project
                </button>
              </div>

              <div className="bg-[#1e2937] rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-6 px-8 font-medium text-slate-400">PREVIEW</th>
                        <th className="text-left py-6 px-8 font-medium text-slate-400">PROJECT NAME</th>
                        <th className="text-left py-6 px-8 font-medium text-slate-400">TYPE</th>
                        <th className="text-left py-6 px-8 font-medium text-slate-400">AREA</th>
                        <th className="text-left py-6 px-8 font-medium text-slate-400">BEDROOMS</th>
                        <th className="text-left py-6 px-8 font-medium text-slate-400">STATUS</th>
                        <th className="text-right py-6 px-8 font-medium text-slate-400">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {projects.map(project => (
                        <tr key={project.id} className="hover:bg-slate-800/50 transition">
                          <td className="py-6 px-8">
                            <img src={project.image} className="w-14 h-14 object-cover rounded-2xl" alt="" />
                          </td>
                          <td className="py-6 px-8 font-medium">{project.name}</td>
                          <td className="py-6 px-8 text-slate-400">{project.type}</td>
                          <td className="py-6 px-8 text-slate-400">{project.area}</td>
                          <td className="py-6 px-8">{project.bedrooms}</td>
                          <td className="py-6 px-8">
                            <span className={`px-5 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="py-6 px-8 text-right">
                            <div className="flex gap-3 justify-end">
                              <button 
                                onClick={() => openModal('project', project)}
                                className="p-3 hover:bg-slate-700 rounded-xl transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete('project', project.id)}
                                className="p-3 hover:bg-red-500/10 text-red-400 rounded-xl transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------- */}
                          {/* TEAM SECTION */}
          {/* ------------------------------------------------------- */}

          {currentPage === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-3xl font-bold">Team Members</div>
                  <div className="text-slate-400">Architecture &amp; design professionals</div>
                </div>
                <button 
                  onClick={() => openModal('team')}
                  className="flex items-center gap-3 bg-[#a3e635] hover:bg-[#84cc16] transition text-[#0f172a] font-semibold px-8 py-3.5 rounded-2xl"
                >
                  <Plus className="w-5 h-5" />
                  Add Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                  <div key={member.id} className="bg-[#1e2937] rounded-3xl p-6 flex flex-col">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal('team', member)} className="p-2 hover:bg-slate-700 rounded-xl">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete('team', member.id)} className="p-2 hover:bg-red-500/10 text-red-400 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mx-auto -mt-4 mb-6">
                      <img src={member.photo} className="w-28 h-28 rounded-3xl object-cover ring-4 ring-[#0f172a]" alt="" />
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-2xl">{member.name}</div>
                      <div className="text-[#a3e635] mt-1 font-medium">{member.role}</div>
                    </div>

                    <div className="mt-auto pt-8 space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-slate-700 rounded-lg flex items-center justify-center">✉</div>
                        <div>{member.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------- */}
          {/* USERS SECTION */}
          {/* ------------------------------------------------------- */}


          {currentPage === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-3xl font-bold">Users</div>
                  <div className="text-slate-400">Clients &amp; registered users</div>
                </div>
                <button 
                  onClick={() => openModal('user')}
                  className="flex items-center gap-3 bg-[#a3e635] hover:bg-[#84cc16] transition text-[#0f172a] font-semibold px-8 py-3.5 rounded-2xl"
                >
                  <Plus className="w-5 h-5" />
                  Add User
                </button>
              </div>

              <div className="bg-[#1e2937] rounded-3xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-6 px-8 font-medium text-slate-400">NAME</th>
                      <th className="text-left py-6 px-8 font-medium text-slate-400">EMAIL</th>
                      <th className="text-left py-6 px-8 font-medium text-slate-400">ROLE</th>
                      <th className="text-left py-6 px-8 font-medium text-slate-400">STATUS</th>
                      <th className="text-right py-6 px-8 font-medium text-slate-400">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-800/50">
                        <td className="py-6 px-8 font-medium">{user.name}</td>
                        <td className="py-6 px-8 text-slate-400">{user.email}</td>
                        <td className="py-6 px-8">
                          <span className="bg-slate-700 px-4 py-1 rounded-full text-xs">{user.role}</span>
                        </td>
                        <td className="py-6 px-8">
                          <span className={`px-5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <div className="flex gap-3 justify-end">
                            <button 
                              onClick={() => openModal('user', user)}
                              className="p-3 hover:bg-slate-700 rounded-xl transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete('user', user.id)}
                              className="p-3 hover:bg-red-500/10 text-red-400 rounded-xl transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && modalType && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1e2937] w-full max-w-lg rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                {editingItem ? 'Edit' : 'Add New'} {modalType === 'project' && 'Project'}
                {modalType === 'team' && 'Team Member'}
                {modalType === 'user' && 'User'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {modalType === 'project' && (
                <>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Project Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Type</label>
                      <select
                        value={formData.type || 'Residential'}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Landscape</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Area</label>
                      <input
                        type="text"
                        value={formData.area || ''}
                        onChange={e => setFormData({...formData, area: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                        placeholder="2450 sq ft"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Bedrooms</label>
                      <input
                        type="number"
                        value={formData.bedrooms || 0}
                        onChange={e => setFormData({...formData, bedrooms: parseInt(e.target.value)})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Status</label>
                      <select
                        value={formData.status || 'Ongoing'}
                        onChange={e => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      >
                        <option>Ongoing</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Image URL (for preview)</label>
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      placeholder="https://picsum.photos/..."
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-3xl px-6 py-4 h-32 outline-none resize-y"
                    />
                  </div>
                </>
              )}

              {modalType === 'team' && (
                <>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Role</label>
                    <select
                      value={formData.role || 'Architect'}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                    >
                      <option>Principal Architect</option>
                      <option>Lead Interior Designer</option>
                      <option>Structural Engineer</option>
                      <option>3D Visualizer</option>
                      <option>Project Coordinator</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Photo URL</label>
                    <input
                      type="text"
                      value={formData.photo || ''}
                      onChange={e => setFormData({...formData, photo: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      placeholder="https://picsum.photos/..."
                    />
                  </div>
                </>
              )}

              {modalType === 'user' && (
                <>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Role</label>
                      <select
                        value={formData.role || 'Client'}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      >
                        <option>Client</option>
                        <option>Staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Status</label>
                      <select
                        value={formData.status || 'Active'}
                        onChange={e => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-[#0f172a] border border-slate-600 focus:border-[#a3e635] rounded-2xl px-6 py-4 outline-none"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-4 border border-slate-600 hover:bg-slate-700 rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#a3e635] hover:bg-[#84cc16] text-[#0f172a] font-semibold rounded-2xl transition"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
  
};

export default AdminDashboard;