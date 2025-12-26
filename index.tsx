import React, { useState, useEffect, useMemo } from 'react';
import {
    Users, Calendar, BookOpen, Shield, GraduationCap,
    CreditCard, AlertTriangle, CheckCircle, Search,
    UserPlus, FileText, BarChart, Settings, LogOut,
    ChevronRight, ArrowRightLeft, UserCheck, Clock,
    Filter, Plus, Trash2, Download, Info, MessageSquare,
    MapPin, Phone, Mail, Award, XCircle
} from 'lucide-react';

// --- Configuration & Mock Data ---
const PROGRAMS = [
    { id: 'cs', name: 'Computer Science', totalCredits: 132, type: 'Credit Hours', duration: '4 Years' },
    { id: 'eng', name: 'Engineering', totalCredits: 160, type: 'Credit Hours', duration: '5 Years' }
];

const SUBJECTS = [
    { id: 'cs101', code: 'CS101', name: 'Intro to Programming', credits: 3, prereq: null, programId: 'cs' },
    { id: 'cs102', code: 'CS102', name: 'Data Structures', credits: 3, prereq: 'cs101', programId: 'cs' },
    { id: 'cs201', code: 'CS201', name: 'Database Systems', credits: 3, prereq: 'cs102', programId: 'cs' },
    { id: 'math101', code: 'MTH101', name: 'Calculus I', credits: 4, prereq: null, programId: 'eng' }
];

const App = () => {
    const [userRole, setUserRole] = useState('superadmin');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [regTab, setRegTab] = useState('open');

    // --- Central Data State ---
    const [students, setStudents] = useState([
        {
            id: '2024001',
            name: 'Omar Khaled',
            program: 'cs',
            level: 'Undergraduate',
            status: 'Active',
            gpa: 3.82,
            paid: true,
            phone: '01012345678',
            email: 'omar.k@univ.edu',
            address: 'Cairo, Egypt',
            enrolled: ['cs101', 'cs102'],
            rank: 12
        },
        { id: '2024002', name: 'Laila Hassan', program: 'cs', level: 'Alumni', status: 'Graduated', gpa: 3.5, paid: true, phone: '01212345678', enrolled: [] },
        { id: '2024003', name: 'Ziad Amer', program: 'eng', level: 'Undergraduate', status: 'Probation', gpa: 1.9, paid: false, phone: '01199887766', enrolled: ['math101'] }
    ]);

    const [staff, setStaff] = useState([
        { id: 's1', name: 'Dr. Sarah Ahmed', role: 'Instructor', department: 'CS' },
        { id: 's2', name: 'Eng. Mona Ali', role: 'TA', department: 'CS' },
        { id: 's3', name: 'Dr. Zaki', role: 'Instructor', department: 'Math' }
    ]);

    const [schedule, setSchedule] = useState([
        { id: 1, subjectId: 'cs101', type: 'Lecture', code: 'L-101', instructor: 'Dr. Sarah Ahmed', day: 'Monday', time: '09:00', room: 'Hall A', capacity: 50, enrolledCount: 45 },
        { id: 2, subjectId: 'cs102', type: 'Tutorial', code: 'T-102', instructor: 'Eng. Mona Ali', day: 'Monday', time: '11:00', room: 'Lab 2', capacity: 25, enrolledCount: 20 },
        { id: 3, subjectId: 'cs201', type: 'Lab', code: 'LB-201', instructor: 'Eng. Mona Ali', day: 'Wednesday', time: '09:00', room: 'Lab 4', capacity: 20, enrolledCount: 15 },
        { id: 4, subjectId: 'math101', type: 'Lecture', code: 'L-M1', instructor: 'Dr. Zaki', day: 'Tuesday', time: '10:00', room: 'Hall C', capacity: 60, enrolledCount: 58 }
    ]);

    const currentStudent = students[0];

    // --- Logic ---
    const getConflict = (newSlot) => {
        return schedule.find(s =>
            currentStudent.enrolled.includes(s.subjectId) &&
            s.day === newSlot.day &&
            s.time === newSlot.time
        );
    };

    const hasPrereq = (subjectId) => {
        const subject = SUBJECTS.find(s => s.id === subjectId);
        if (!subject.prereq) return true;
        return currentStudent.enrolled.includes(subject.prereq);
    };

    // --- View Components ---

    const SuperAdminView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Records', val: students.length, color: 'text-slate-900', icon: <Users size={20} /> },
                    { label: 'Active Staff', val: staff.length, color: 'text-indigo-600', icon: <UserCheck size={20} /> },
                    { label: 'Unpaid Fees', val: '12 Students', color: 'text-rose-500', icon: <CreditCard size={20} /> },
                    { label: 'Avg GPA', val: '3.1', color: 'text-emerald-500', icon: <Award size={20} /> }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="p-2 bg-slate-50 rounded-xl text-slate-400">{stat.icon}</span>
                            <span className="text-[10px] font-bold text-slate-300 uppercase">Live</span>
                        </div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Student Archive & Personal Data</h3>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">Filter Archive</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Identity & Contact</th>
                                    <th className="px-6 py-4">Level</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {students.map(s => (
                                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900">{s.name}</p>
                                            <div className="flex items-center gap-3 mt-1 opacity-60">
                                                <span className="flex items-center gap-1 text-[10px]"><Phone size={10} /> {s.phone}</span>
                                                <span className="flex items-center gap-1 text-[10px]"><Mail size={10} /> {s.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-500">{s.level}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : s.status === 'Probation' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`w-3 h-3 rounded-full ${s.paid ? 'bg-emerald-400' : 'bg-rose-400'} shadow-sm shadow-inner`}></div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-indigo-50 rounded-lg text-slate-300 hover:text-indigo-600 transition-all"><ChevronRight size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><UserPlus size={18} /> Quick Admissions</h4>
                        <div className="space-y-3">
                            <input type="text" placeholder="Full Legal Name" className="w-full bg-white/10 border-none rounded-xl p-3 text-sm placeholder:text-white/40 outline-none focus:ring-2 ring-white/50" />
                            <input type="text" placeholder="Phone Number" className="w-full bg-white/10 border-none rounded-xl p-3 text-sm placeholder:text-white/40 outline-none focus:ring-2 ring-white/50" />
                            <select className="w-full bg-white/10 border-none rounded-xl p-3 text-sm outline-none">
                                <option className="text-slate-900">CS Undergraduate</option>
                                <option className="text-slate-900">ENG Undergraduate</option>
                                <option className="text-slate-900">Postgraduate</option>
                            </select>
                            <button className="w-full py-3 bg-white text-indigo-600 font-black rounded-xl text-sm shadow-lg hover:bg-slate-100 transition-all">Generate ID & Enroll</button>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-800"><MessageSquare size={18} className="text-indigo-500" /> Staff Feedback</h4>
                        <div className="space-y-4">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 mb-1">DR. SARAH • CS101</p>
                                <p className="text-xs text-slate-600 leading-relaxed">"Requesting lab capacity increase for Tutorial T-102."</p>
                            </div>
                            <button className="w-full text-xs font-bold text-indigo-600 hover:underline">View All Feedback Reports</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const AdminView = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-xl text-slate-900">Semester & Time Management</h3>
                            <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"><Plus size={20} /></button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {schedule.map(slot => (
                                <div key={slot.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 group transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="px-2 py-0.5 bg-white rounded-lg text-[10px] font-black text-indigo-600 border border-slate-100 shadow-sm">{slot.code}</span>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-1.5 text-slate-400 hover:text-indigo-600"><Settings size={14} /></button>
                                            <button className="p-1.5 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-slate-800">{SUBJECTS.find(s => s.id === slot.subjectId)?.name}</h4>
                                    <p className="text-xs text-slate-500 mt-1 mb-4 flex items-center gap-1 font-medium"><MapPin size={12} /> {slot.room} • {slot.type}</p>
                                    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">ID</div>
                                            <span className="text-xs font-bold text-slate-600 truncate max-w-[100px]">{slot.instructor}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{slot.day} {slot.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-6">Staff Management</h4>
                        <div className="space-y-3">
                            {staff.map(member => (
                                <div key={member.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{member.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{member.role} • {member.department}</p>
                                        </div>
                                    </div>
                                    <button className="p-1.5 text-slate-300 hover:text-rose-500"><XCircle size={16} /></button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-lg shadow-slate-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            <Plus size={16} /> Hire Instructor / TA
                        </button>
                    </div>

                    <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                        <h4 className="font-bold text-emerald-900 mb-2">Program Differentiation</h4>
                        <p className="text-xs text-emerald-700/80 leading-relaxed">
                            Manage specific credit requirements and elective blocks per major. Current System: <strong>Spring 2025</strong>
                        </p>
                        <button className="mt-4 text-[10px] font-black text-emerald-600 hover:underline">Download Nateega (Grades) State</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const StudentView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Subject Registration</h2>
                            <p className="text-slate-400 text-sm font-medium">Divided by Open/Closed Tabs • Static Time Ranking</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-2xl self-start">
                            <button onClick={() => setRegTab('open')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${regTab === 'open' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>Open Sessions</button>
                            <button onClick={() => setRegTab('closed')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${regTab === 'closed' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>Full / Closed</button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {schedule.filter(s => regTab === 'open' ? s.enrolledCount < s.capacity : s.enrolledCount >= s.capacity).map(slot => {
                            const sub = SUBJECTS.find(x => x.id === slot.subjectId);
                            const conflict = getConflict(slot);
                            const eligible = hasPrereq(slot.subjectId);

                            return (
                                <div key={slot.id} className={`p-6 rounded-3xl border transition-all ${conflict ? 'border-rose-100 bg-rose-50/20 opacity-70' : 'border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-indigo-100 group'}`}>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center font-black text-xs text-indigo-600">
                                                {slot.code}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{sub.name}</h4>
                                                <div className="flex flex-wrap gap-4 mt-1 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {slot.day} {slot.time}</span>
                                                    <span className="flex items-center gap-1"><UserCheck size={12} /> {slot.instructor}</span>
                                                    <span className="flex items-center gap-1 text-indigo-500 font-black">{sub.credits} CH</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-auto text-left md:text-right">
                                            {conflict ? (
                                                <div className="text-rose-500 text-[10px] font-black uppercase flex items-center gap-1 md:justify-end">
                                                    <AlertTriangle size={14} /> Schedule Conflict: {conflict.code}
                                                </div>
                                            ) : !eligible ? (
                                                <div className="text-amber-500 text-[10px] font-black uppercase flex items-center gap-1 md:justify-end">
                                                    <Shield size={14} /> Missing Prerequisite
                                                </div>
                                            ) : (
                                                <button className="w-full md:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-indigo-600 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0">Add Subject</button>
                                            )}
                                            <div className="mt-2 flex items-center justify-between md:justify-end gap-2">
                                                <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: `${(slot.enrolledCount / slot.capacity) * 100}%` }}></div>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-300 uppercase">{slot.enrolledCount}/{slot.capacity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Personal Bio Card */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={120} /></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black">{currentStudent.name}</h3>
                        <p className="text-xs opacity-60 font-medium">Major: Computer Science</p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-xs">
                                <span className="p-2 bg-white/10 rounded-lg"><Phone size={14} /></span>
                                <span className="font-bold">{currentStudent.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                                <span className="p-2 bg-white/10 rounded-lg"><MapPin size={14} /></span>
                                <span className="font-bold">{currentStudent.address}</span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                                <p className="text-[10px] opacity-60 font-bold uppercase">GPA</p>
                                <p className="text-2xl font-black">{currentStudent.gpa}</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                                <p className="text-[10px] opacity-60 font-bold uppercase">Univ. Rank</p>
                                <p className="text-2xl font-black">#{currentStudent.rank}</p>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-2xl text-xs font-black hover:bg-rose-500/20 transition-all">Request Withdrawal</button>
                    </div>
                </div>

                {/* Feedback Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <h4 className="font-black text-slate-800 mb-4">Course Feedback</h4>
                    <p className="text-xs text-slate-400 mb-4 italic">Your feedback is anonymous and helps improve instruction quality.</p>
                    <textarea placeholder="Share your experience..." className="w-full h-24 bg-slate-50 border-none rounded-2xl p-4 text-xs outline-none focus:ring-2 ring-indigo-500/20 resize-none"></textarea>
                    <button className="w-full mt-3 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all">Submit Feedback</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Navigation */}
            <nav className="w-24 bg-white border-r border-slate-100 flex flex-col items-center py-10 z-50">
                <div className="w-14 h-14 bg-slate-900 rounded-3xl flex items-center justify-center text-white mb-14 shadow-xl">
                    <GraduationCap size={28} />
                </div>
                <div className="flex flex-col gap-10 flex-1">
                    {[
                        { id: 'dashboard', icon: <BarChart size={24} /> },
                        { id: 'archive', icon: <Users size={24} /> },
                        { id: 'schedule', icon: <Calendar size={24} /> },
                        { id: 'money', icon: <CreditCard size={24} /> }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100' : 'text-slate-300 hover:text-slate-600'}`}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
                <button onClick={() => { }} className="p-3 text-slate-200 hover:text-rose-500">
                    <LogOut size={24} />
                </button>
            </nav>

            {/* Main Body */}
            <div className="flex-1">
                <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-6">
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                            {['superadmin', 'admin', 'student'].map(role => (
                                <button
                                    key={role}
                                    onClick={() => setUserRole(role)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === role ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Search archive, subjects, staff..." className="bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-12 pr-6 text-sm w-80 outline-none focus:ring-4 ring-indigo-500/5 focus:bg-white transition-all" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900">System Demo</p>
                                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">{userRole} active</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-black text-lg">
                                {userRole.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-10 max-w-[1600px] mx-auto">
                    {userRole === 'superadmin' && <SuperAdminView />}
                    {userRole === 'admin' && <AdminView />}
                    {userRole === 'student' && <StudentView />}
                </main>
            </div>
        </div>
    );
};


export default App;
