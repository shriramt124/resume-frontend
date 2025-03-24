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
    LogOut,
    CheckCircle2,
    Clock,
    ExternalLink,
    Plus
} from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Builder from './builder.js'
import Layout from '@/components/Layout';
import Jobs from '@/components/dashboard-sections/Jobs';
import JobTracker from '@/components/dashboard-sections/JobTracker';
import InterviewPrep from '@/components/dashboard-sections/InterviewPrep';
import SalaryAnalyzer from '@/components/dashboard-sections/SalaryAnalyzer';
import { useRouter } from 'next/router';
export default function Home() {
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showBuilder, setShowBuilder] = useState(false);
    const dropdownRef = useRef(null);
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeProfileId, setActiveProfileId] = useState(null);

    const fetchProfiles = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return router.push('/login');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) throw new Error('Failed to fetch profiles');

            const data = await response.json();
            if (data && Array.isArray(data.data)) {
                setProfiles(data.data);
                // Set active profile from localStorage if exists
                const storedProfile = JSON.parse(localStorage.getItem('profileData') || '{}');
                if (storedProfile.id) {
                    setActiveProfileId(storedProfile.id);
                }
            }
        } catch (error) {
            console.error('Error fetching profiles:', error);
            setProfiles([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleActiveResume = (profile) => {
        localStorage.setItem('profileData', JSON.stringify(profile));
        setActiveProfileId(profile.id);
        setShowBuilder(true);
    };

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('profileData');
        router.push('/login');
    };

    const renderSidebar = () => (
        <aside className="fixed bottom-0 left-0 right-0 md:relative md:w-16 lg:w-64 border-t md:border-t-0 md:border-r md:min-h-[calc(100vh-73px)] bg-background/95 backdrop-blur-sm bg-gray-50/90 md:bg-background z-10 md:p-2 lg:p-4 overflow-y-auto max-h-[40vh] md:max-h-none shadow-sm">
            <nav className="flex justify-center md:justify-start md:flex-col overflow-x-auto md:overflow-x-visible md:space-y-2 px-2 py-3 md:p-0 bg-transparent scrollbar-none">
                <a
                    href="#"
                    onClick={() => {
                        setActiveTab('Dashboard');
                        setShowBuilder(false);
                    }}
                    className={`flex-shrink-0 flex flex-col md:flex-row items-center md:justify-center lg:justify-start md:gap-3 px-3 sm:px-4 py-2 rounded-lg ${activeTab === 'Dashboard' ? 'bg-teal-100 text-gray-600' : 'text-gray-600 hover:bg-gray-100'} mx-1 sm:mx-2 md:mx-0`}
                >
                    <LayoutDashboard size={20} />
                    <span className="text-xs mt-1 md:hidden lg:inline-block lg:text-base lg:mt-0">Dashboard</span>
                </a>
                {[
                    { icon: FileText, text: 'Info', hidden: true },
                    { icon: Briefcase, text: 'Jobs' },
                    { icon: LineChart, text: 'Job Tracker' },
                    { icon: GraduationCap, text: 'Interview Prep' },
                    { icon: DollarSign, text: 'Salary Analyzer', hidden: true },
                    { icon: Search, text: 'Job Search Method', hidden: true },
                    { icon: Headphones, text: 'Coaching', hidden: true },
                    { icon: FileOutput, text: 'Cover Letters', hidden: true }, // Added hidden property to hide this item
                    { icon: MoreHorizontal, text: 'Other', hidden: true },
                ].filter(item => !item.hidden).map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        onClick={() => {
                            setActiveTab(item.text);
                            setShowBuilder(item.text === 'Info');
                        }}
                        className={`flex-shrink-0 flex flex-col md:flex-row items-center md:justify-center lg:justify-start md:gap-3 px-3 sm:px-4 py-2 rounded-lg ${activeTab === item.text ? 'bg-teal-100 text-gray-600' : 'text-gray-600 hover:bg-teal-100'} mx-1 sm:mx-2 md:mx-0`}
                    >
                        <item.icon size={20} />
                        <span className="text-xs mt-1 md:hidden lg:inline-block lg:text-base lg:mt-0">{item.text}</span>
                    </a>
                ))}

                {/* Logout Button */}
                <div className="mt-auto pt-4 md:pt-6">
                    <a
                        href="#"
                        onClick={handleLogout}
                        className="flex-shrink-0 flex flex-col md:flex-row items-center md:justify-center lg:justify-start md:gap-3 px-3 sm:px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 mx-1 sm:mx-2 md:mx-0"
                    >
                        <LogOut size={20} />
                        <span className="text-xs mt-1 md:hidden lg:inline-block lg:text-base lg:mt-0">Logout</span>
                    </a>
                </div>
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
                    <main className="p-3 sm:p-4 md:p-6 pb-24 md:pb-6 flex justify-center md:justify-start flex-1 overflow-x-hidden">
                        {(() => {
                            switch (activeTab) {
                                case 'Jobs':
                                    return <Jobs />;
                                case 'Job Tracker':
                                    return <JobTracker />;
                                case 'Interview Prep':
                                    return <InterviewPrep />;
                                case 'Salary Analyzer':
                                    return <SalaryAnalyzer />;
                                default:
                                    return (
                                        <div>
                                            <div className="mb-6">
                                                <h2 className="text-2xl font-semibold mb-4">Resumes</h2>
                                                <div className="border-b">
                                                    <div className="flex gap-6">
                                                        <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">Resumes</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-2 sm:px-0">
                                                {/* New Resume Card */}
                                                <div
                                                    onClick={() => setShowBuilder(true)}
                                                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 md:space-y-6 transition-all duration-300 hover:border-teal-400 hover:bg-blue-50/30 group cursor-pointer h-[350px] sm:h-[400px] md:h-[480px]"
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                        <h3 className="text-2xl font-semibold text-gray-700">+</h3>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h3 className="text-xl font-semibold text-gray-800">New Resume</h3>
                                                        <p className="text-gray-600 max-w-sm text-sm leading-relaxed">
                                                            Create a tailored resume for each job application. Double your chances of getting hired!
                                                        </p>
                                                    </div>
                                                    <button className="px-6 py-2.5 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors duration-200 font-medium shadow-sm hover:shadow group-hover:scale-105">
                                                        Create New
                                                    </button>
                                                </div>

                                                {isLoading ? (
                                                    <div className="col-span-full flex justify-center items-center py-12">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-300"></div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {profiles.map((profile) => (
                                                            <div
                                                                key={profile.id}
                                                                onClick={() => handleActiveResume(profile)}
                                                                className={`bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer h-[350px] sm:h-[400px] md:h-[480px] ${activeProfileId === profile.id ? 'ring-2 ring-teal-300' : ''}`}
                                                            >
                                                                <div className="relative w-full h-32 sm:h-40 md:h-45 bg-teal-300 flex justify-center items-center">
                                                                    {/* <Image
                                                                        src={`/templates/${profile.template_id || 'modern'}.png`}
                                                                        alt="Resume preview"
                                                                        fill
                                                                        className="object-cover"
                                                                        priority
                                                                    /> */}
                                                                    <h1 className='text-2xl font-bold text-gray-900 capitalize'>{profile.first_name}</h1>
                                                                </div>
                                                                <div className="p-6">
                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <div className="flex items-center">
                                                                            {activeProfileId === profile.id ? (
                                                                                <div className="flex items-center">
                                                                                    <CheckCircle2 className="h-5 w-5 text-teal-400 mr-2" />
                                                                                    <span className="text-xs font-medium text-black px-2 py-0.5 bg-teal-200 rounded-full">
                                                                                        Active
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                <span className="w-3 h-3 bg-gray-200 rounded-full mr-2" />
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <h3 className="text-lg font-semibold text-gray-700">{`${profile.first_name} ${profile.last_name}`}</h3>

                                                                    <p className="mt-1 text-sm text-gray-700">{profile.occupation || 'Untitled'}</p>

                                                                    <div className="mt-4 flex items-center text-sm text-gray-500">
                                                                        <Clock className="h-4 w-4 mr-1" />
                                                                        <span>Updated {formatDate(profile.updated_at)}</span>
                                                                    </div>

                                                                    <div className="mt-6 flex items-center justify-between">
                                                                        <button
                                                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-teal-300 rounded-lg hover:bg-teal-200   transition-colors duration-200"
                                                                        >
                                                                            Use Resume
                                                                            <ExternalLink className="ml-2 h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}


                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                            }
                        })()}
                    </main>
                </div>
            </div>
        </Layout>
    );
}


