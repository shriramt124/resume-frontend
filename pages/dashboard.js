import {
    LayoutDashboard,
    FileText,
    Briefcase,
    LineChart,
    GraduationCap,
    DollarSign,
    Search,
    Headphones,
    MoreHorizontal,
    FileDown,
    FileOutput,
    UserCircle,
    LogOut
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Builder from './builder.js'
import Layout from '@/components/Layout';

export default function Home() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showBuilder, setShowBuilder] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [activeTab, setActiveTab] = useState('Dashboard');

    const renderSidebar = () => (
        <aside className="fixed bottom-0 left-0 right-0 md:relative md:w-16 lg:w-64 border-t md:border-t-0 md:border-r md:min-h-[calc(100vh-73px)] bg-background/95 backdrop-blur-sm bg-gray-50/90 md:bg-background z-10 md:p-2 lg:p-4 overflow-y-auto max-h-[40vh] md:max-h-none">
            <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:space-y-2 px-2 py-3 md:p-0 bg-transparent">
                <a
                    href="#"
                    onClick={() => {
                        setActiveTab('Dashboard');
                        setShowBuilder(false);
                    }}
                    className={`flex-shrink-0 flex flex-col md:flex-row items-center md:justify-center lg:justify-start md:gap-3 px-4 py-2 rounded-lg ${activeTab === 'Dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'} mx-2 md:mx-0`}
                >
                    <LayoutDashboard size={20} />
                    <span className="text-xs mt-1 md:hidden lg:inline-block lg:text-base lg:mt-0">Dashboard</span>
                </a>
                {[
                    { icon: FileText, text: 'Info' },
                    { icon: FileText, text: 'Documents' },
                    { icon: Briefcase, text: 'Jobs' },
                    { icon: LineChart, text: 'Job Tracker' },
                    { icon: GraduationCap, text: 'Interview Prep' },
                    { icon: DollarSign, text: 'Salary Analyzer' },
                    { icon: Search, text: 'Job Search Method' },
                    { icon: Headphones, text: 'Coaching' },
                    { icon: MoreHorizontal, text: 'Other' },
                ].map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        onClick={() => {
                            setActiveTab(item.text);
                            setShowBuilder(item.text === 'Info');
                        }}
                        className={`flex-shrink-0 flex flex-col md:flex-row items-center md:justify-center lg:justify-start md:gap-3 px-4 py-2 rounded-lg ${activeTab === item.text ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'} mx-2 md:mx-0`}
                    >
                        <item.icon size={20} />
                        <span className="text-xs mt-1 md:hidden lg:inline-block lg:text-base lg:mt-0">{item.text}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );

    if (showBuilder) {
        return (
            <Layout>
                <div className="min-h-screen bg-background">
                    <div className="flex flex-col md:flex-row">
                        {renderSidebar()}
                        {/* Main Content - Resume Builder */}
                        <main className="flex-1 p-6 pb-24 md:pb-6">
                            <Builder onClose={() => setShowBuilder(false)} />
                        </main>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-background">


                <div className="flex flex-col md:flex-row">
                    {renderSidebar()}

                    {/* Main Content - adjust padding for mobile */}
                    <main className="flex-1 p-6 pb-24 md:pb-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Resumes & Cover Letters</h2>
                            <div className="border-b">
                                <div className="flex gap-6">
                                    <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">Resumes</button>
                                    <button className="px-4 py-2 text-gray-600">Cover Letters</button>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {/* Existing Resume Card */}
                            <div
                                onClick={() => setShowBuilder(true)}
                                className="border rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer h-[480px]"
                            >
                                <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 h-48 flex items-center justify-center transition-colors duration-300 hover:from-yellow-300 hover:to-yellow-200">
                                    <span className="text-2xl font-bold text-gray-800">JOHN DOE</span>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-lg">Untitled</h3>
                                        <span className="text-sm text-gray-500 font-medium">Updated 4 Dec 2022</span>
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-pink-100">
                                        <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                                        15% Your resume score
                                    </div>
                                    <div className="mt-2">
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow">
                                            <FileDown size={18} />
                                            Download Resume
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                        <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                            Preview
                                        </button>
                                        <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* New Resume Card */}
                            <div
                                onClick={() => setShowBuilder(true)}
                                className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-6 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/30 group cursor-pointer h-[480px]"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <h3 className="text-2xl font-semibold text-blue-600">+</h3>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-800">New Resume</h3>
                                    <p className="text-gray-600 max-w-sm text-sm leading-relaxed">
                                        Create a tailored resume for each job application. Double your chances of getting hired!
                                    </p>
                                </div>
                                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow group-hover:scale-105">
                                    Create New
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
}
