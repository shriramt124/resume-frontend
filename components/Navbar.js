import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import {
    Menu,
    X,
    ChevronDown,
    Search,
    Layout as LayoutIcon,
    UserCircle2,
    FileText,
    Home,
    Info,
    Phone,
    Settings,
    CheckCircle2,
    ExternalLink
} from 'lucide-react';

const Navbar = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const [showResumeDropdown, setShowResumeDropdown] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeProfileId, setActiveProfileId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navLinks = [
        // { title: 'Home', href: '/', icon: Home },
        // { title: 'Templates', href: '/templates', icon: FileText },
        // { title: 'About', href: '/about', icon: Info },
        // { title: 'Contact', href: '/contact', icon: Phone },
    ];

    const fetchProfiles = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/get-resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            const data = await response.json();
            setProfiles(data.data);
            const storedProfile = JSON.parse(localStorage.getItem('profileData') || '{}');
            if (storedProfile.id) {
                setActiveProfileId(storedProfile.id);
            }
        } catch (error) {
            console.error('Error fetching profiles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            setIsAuthenticated(!!token);
            setUserName(userData.name || 'User');
        };

        checkAuth();
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        setUserName(userData.name || '');

        // Only fetch profiles if authenticated
        if (isAuthenticated) {
            fetchProfiles();
        }

        // Get active profile ID from URL if present
        const { userProfileId } = router.query;
        if (userProfileId) {
            setActiveProfileId(parseInt(userProfileId));
        }

        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [router.query, isAuthenticated]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setShowProfileMenu(false);
        setProfiles([]);
        setActiveProfileId(null);
        router.push('/login');
    };

    const handleActiveResume = (profile) => {
        localStorage.setItem('profileData', JSON.stringify(profile));
        setActiveProfileId(profile.id);
        closeAllMenus();
    };
    const ResumeItem = ({ profile, isMobile = false }) => (
        <Link
            href={`/builder?userProfileId=${profile.id}`}
            onClick={() => handleActiveResume(profile)}
            className={`flex items-center px-6 py-2 text-sm hover:bg-gray-100 transition-all duration-200 ${
                isMobile ? 'rounded-md' : ''
            } ${activeProfileId === profile.id ? 'bg-blue-50' : ''}`}
        >
            <div className="flex items-center flex-1">
                {activeProfileId === profile.id ? (
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2" />
                ) : (
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                )}
                <span className={`${
                    activeProfileId === profile.id
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600'
                }`}>
                    {profile.first_name} {profile.last_name}
                </span>
            </div>
        </Link>
    );

    const DesktopResumeList = () => (
        <div className="bg-gray-50 py-2">
            {isLoading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            ) : profiles.length > 0 ? (
                <>
                    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Your Resumes</h3>
                        <Link
                            href="/resumes"
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                            View All
                            <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                    {profiles.map((profile) => (
                        <ResumeItem key={profile.id} profile={profile} />
                    ))}
                </>
            ) : (
                <div className="px-6 py-2 text-sm text-gray-500">No resumes found</div>
            )}
        </div>
    );
    const MobileResumeList = () => (
        <div className="pl-5 space-y-1">
            {isLoading ? (
                <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : profiles.length > 0 ? (
                <>
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Your Resumes</h3>
                        <Link
                            href="/resumes"
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                            View All
                            <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                    {profiles.map((profile) => (
                        <ResumeItem key={profile.id} profile={profile} isMobile={true} />
                    ))}
                </>
            ) : (
                <div className="px-3 py-2 text-sm text-gray-500">No resumes found</div>
            )}
        </div>
    );
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsScrolled(currentScrollPos > 10);
            setVisible(
                (prevScrollPos > currentScrollPos) ||
                currentScrollPos < 10 ||
                isOpen
            );
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, isOpen]);

    const closeAllMenus = () => {
        setShowProfileMenu(false);
        setShowResumeDropdown(false);
        setIsOpen(false);
    };
    const renderAuthContent = () => {
        if (!isAuthenticated) {
            return (
               ""
            );
        }

        return (
            <>
                {/* Desktop Profile Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <UserCircle2 className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{userName}</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}/>
                    </button>

                    {/* Desktop Dropdown Menu */}
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{userName}</p>
                            </div>

                            <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Settings className="h-4 w-4 mr-2" />
                                Profile Settings
                            </Link>

                            <button
                                onClick={() => setShowResumeDropdown(!showResumeDropdown)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                My Resumes
                                <ChevronDown className={`ml-auto h-4 w-4 transform transition-transform duration-200 ${showResumeDropdown ? 'rotate-180' : ''}`}/>
                            </button>

                            {showResumeDropdown && <DesktopResumeList />}

                            <div className="border-t border-gray-100 mt-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    };

    // Render mobile auth content
    const renderMobileAuthContent = () => {
        if (!isAuthenticated) {
            return (
                ""
            );
        }

        return (
            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <UserCircle2 className="h-6 w-6 text-white"/>
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{userName}</div>
                    </div>
                </div>
                <div className="mt-3 space-y-1">
                    <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={closeAllMenus}
                    >
                        <Settings className="h-5 w-5 mr-2" />
                        Profile Settings
                    </Link>

                    <button
                        onClick={() => setShowResumeDropdown(!showResumeDropdown)}
                        className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                        <FileText className="h-5 w-5 mr-2" />
                        My Resumes
                        <ChevronDown className={`ml-auto h-5 w-5 transform transition-transform duration-200 ${showResumeDropdown ? 'rotate-180' : ''}`}/>
                    </button>

                    {showResumeDropdown && <MobileResumeList />}

                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    >
                        <X className="h-5 w-5 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        );
    };

    return (
        <nav className={`
            fixed top-0 w-full z-50
            transition-all duration-300 ease-in-out
            ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}
            ${visible ? 'transform-none' : '-translate-y-full'}
            ${isOpen ? 'bg-white shadow-md' : ''}
        `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link href="/builder?templateId=modern" className="flex items-center space-x-2 group">
                            <LayoutIcon className={`h-8 w-8 transition-colors duration-200
                                ${isScrolled || isOpen ? 'text-blue-600' : 'text-blue-500'}`}
                            />
                            <span className={`font-bold text-xl transition-colors duration-200
                                ${isScrolled || isOpen ? 'text-gray-800' : 'text-gray-700'}
                                group-hover:text-blue-600`}>
                                Resume Builder
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Navigation Links */}
                        <div className="flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <link.icon className="h-4 w-4" />
                                    <span>{link.title}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Render auth content based on authentication status */}
                        {renderAuthContent()}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg transition-colors duration-200
                                ${isScrolled || isOpen ? 'text-gray-600' : 'text-gray-700'}
                                hover:bg-gray-100 hover:text-gray-900`}
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="h-6 w-6" aria-hidden="true"/>
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true"/>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`
                    md:hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                    overflow-hidden
                `}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {/* Mobile Navigation Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                onClick={closeAllMenus}
                            >
                                <link.icon className="h-5 w-5" />
                                <span>{link.title}</span>
                            </Link>
                        ))}

                        {/* Render mobile auth content based on authentication status */}
                        {renderMobileAuthContent()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;