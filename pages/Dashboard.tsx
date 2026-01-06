
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Folder, CreditCard, Image as ImageIcon, 
  FileText, LogOut, ChevronRight, CheckCircle2, 
  Clock, MapPin, Plus, User, ArrowLeft, BarChart3, HardHat
} from 'lucide-react';
import { UserProfile, Project, ConstructionStage, Payment } from '../types';

// Mock Data
const MOCK_PROJECTS: Project[] = [
  { id: 'p1', clientId: '2', name: 'Residential Villa - Tiko', location: 'Golf Layout, Tiko', status: 'IN_PROGRESS', startDate: '2023-11-15', progress: 65 },
  { id: 'p2', clientId: '2', name: 'Commercial Plaza - Buea', location: 'Molyko, Buea', status: 'IN_PROGRESS', startDate: '2024-01-10', progress: 30 },
];

const MOCK_STAGES: ConstructionStage[] = [
  { id: 's1', projectId: 'p1', name: 'Foundation', percentage: 25, completed: true },
  { id: 's2', projectId: 'p1', name: 'Blockwork', percentage: 35, completed: true },
  { id: 's3', projectId: 'p1', name: 'Roofing', percentage: 20, completed: false },
  { id: 's4', projectId: 'p1', name: 'Finishing', percentage: 20, completed: false },
];

const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', projectId: 'p1', amount: 15000000, status: 'PAID', date: '2023-11-10', milestone: 'Advance / Land Title' },
  { id: 'pay2', projectId: 'p1', amount: 8000000, status: 'PAID', date: '2023-12-20', milestone: 'Foundation Completion' },
  { id: 'pay3', projectId: 'p1', amount: 12000000, status: 'PENDING', date: '2024-04-15', milestone: 'Roofing Stage' },
];

const ClientView = ({ project }: { project: Project }) => {
  return (
    <div className="space-y-8">
      {/* Project Overview */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">{project.name}</h2>
            <p className="flex items-center gap-2 text-gray-500 font-medium">
              <MapPin size={18} className="text-chocolate" /> {project.location}
            </p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-xl text-primary font-bold text-sm">
            Status: {project.status.replace('_', ' ')}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Overall Completion</span>
            <span className="text-primary font-black text-2xl">{project.progress}%</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
            <motion.div 
              {...({
                initial: { width: 0 },
                animate: { width: `${project.progress}%` },
                transition: { duration: 1, ease: "easeOut" }
              } as any)}
              className="h-full bg-gradient-to-r from-primary to-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stages Timeline */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-black mb-8 flex items-center gap-2">
            <Clock className="text-chocolate" /> Construction Phases
          </h3>
          <div className="space-y-8 relative">
            <div className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 bg-gray-100"></div>
            {MOCK_STAGES.map((stage) => (
              <div key={stage.id} className="relative pl-12">
                <div className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white z-10 ${
                  stage.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {stage.completed ? <CheckCircle2 size={18} /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${stage.completed ? 'text-gray-900' : 'text-gray-400'}`}>{stage.name}</h4>
                  <span className="text-xs font-black text-gray-400">{stage.percentage}% Impact</span>
                </div>
                {stage.completed && <p className="text-xs text-green-600 font-bold">Successfully Completed</p>}
                {!stage.completed && stage.name === 'Roofing' && (
                  <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-xl">
                    <p className="text-sm text-primary font-medium">Currently in progress. Estimated completion by May 2024.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payments Milestone */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-black mb-8 flex items-center gap-2">
            <CreditCard className="text-chocolate" /> Payment Tracking
          </h3>
          <div className="space-y-6">
            {MOCK_PAYMENTS.map((payment) => (
              <div key={payment.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{payment.milestone}</p>
                    <p className="font-black text-lg text-gray-900">{payment.amount.toLocaleString()} XAF</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase ${
                    payment.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {payment.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={12} /> {payment.date}
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
              Request Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminView = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Projects', value: '24', icon: Folder, color: 'bg-blue-500' },
          { label: 'Total Clients', value: '89', icon: User, color: 'bg-chocolate' },
          { label: 'Ongoing Builds', value: '12', icon: HardHat, iconColor: 'text-primary' },
          { label: 'Pending Payments', value: '6.5M', icon: BarChart3, iconColor: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.color || 'bg-gray-50'}`}>
              <stat.icon className={stat.color ? 'text-white' : stat.iconColor} size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-black">All Client Projects</h3>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
            <Plus size={18} /> New Project
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Project Name</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Location</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Progress</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_PROJECTS.map((proj) => (
                <tr key={proj.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-6 font-bold text-gray-900">{proj.name}</td>
                  <td className="px-8 py-6 text-gray-500">{proj.location}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${proj.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-primary">{proj.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-chocolate font-bold text-sm hover:underline">Update Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }: { user: UserProfile | null; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    window.location.hash = '#/login';
    return null;
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'media', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'docs', label: 'Documents', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-3 mb-10 group">
             <img 
                src="https://i.postimg.cc/2jcQwfK9/Whats-App-Image-2026-01-06-at-5-38-07-PM.jpg" 
                alt="Logo"
                className="h-10 w-auto object-contain rounded-md"
              />
            <div className="flex flex-col">
              <span className="text-primary font-black text-md leading-tight">FOTABONG ROYAL</span>
              <span className="text-chocolate font-bold text-[8px] tracking-widest uppercase">ENTERPRISE</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-black">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm text-gray-900 truncate">{user.name}</p>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="p-6 flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-gray-500 font-medium">Welcome back, {user.name.split(' ')[0]}</p>
          </div>
          <button className="lg:hidden p-3 bg-white border border-gray-200 rounded-xl text-gray-600">
            <LayoutDashboard size={24} />
          </button>
        </header>

        <AnimatePresence mode="wait">
          {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
          <motion.div
            {...({
              key: activeTab,
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.3 }
            } as any)}
          >
            {user.role === 'ADMIN' ? (
              <AdminView />
            ) : (
              <ClientView project={MOCK_PROJECTS[0]} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Helpfully defining Link locally since it's used in Dashboard
const Link = ({ to, children, className }: any) => <a href={`#${to}`} className={className}>{children}</a>;

export default Dashboard;
