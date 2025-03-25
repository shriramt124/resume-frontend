import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Image from 'next/image';

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-resume`, {
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
            className={`flex items-center px-6 py-2 text-sm hover:bg-gray-100 transition-all duration-200 ${isMobile ? 'rounded-md' : ''
                } ${activeProfileId === profile.id ? 'bg-blue-50' : ''}`}
        >
            <div className="flex items-center flex-1">
                {activeProfileId === profile.id ? (
                    <CheckCircle2 className="h-4 w-4 text-[#17c09b] mr-2" />
                ) : (
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                )}
                <span className={`${activeProfileId === profile.id
                    ? 'text-[#22f9c9] font-medium'
                    : 'text-gray-600'
                    }`}>
                    {profile.first_name} {profile.last_name}
                </span>
            </div>
        </Link>
    );

    const DesktopResumeList = () => (
        <div className="bg-gray-50 py-2 h-full flex flex-col">
            {isLoading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            ) : profiles.length > 0 ? (
                <>
                    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                        <h3 className="text-sm font-medium text-gray-900">Your Resumes</h3>
                        <Link
                            href="/resumes"
                            className="flex items-center text-sm text-[#14b894] hover:text-[#1e957b]"
                        >
                            View All
                            <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {profiles.map((profile) => (
                            <ResumeItem key={profile.id} profile={profile} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="px-6 py-2 text-sm text-gray-500">No resumes found</div>
            )}
        </div>
    );
    const MobileResumeList = () => (
        <div className="pl-5 space-y-1 h-full flex flex-col">
            {isLoading ? (
                <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : profiles.length > 0 ? (
                <>
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
                        <h3 className="text-sm font-medium text-gray-900">Your Resumes</h3>
                        <Link
                            href="/resumes"
                            className="flex items-center text-sm text-[#14cda5] hover:text-[#26bb9b]"
                        >
                            View All
                            <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {profiles.map((profile) => (
                            <ResumeItem key={profile.id} profile={profile} isMobile={true} />
                        ))}
                    </div>
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
                    <div className="flex items-center space-x-2 p-2 rounded-full">
                        <div className="h-8 w-8 rounded-full bg-[#0cc39b] flex items-center justify-center">
                            <UserCircle2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{userName}</span>
                    </div>
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
                    <div className="h-10 w-10 rounded-full text-[#0f9b7c] flex items-center justify-center">
                        <UserCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{userName}</div>
                    </div>
                </div>
                <div className="mt-3 space-y-1"></div>
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
            <div className="  mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center text-3xl font-bold">
                        <Link href="/dashboard" className="flex items-center space-x-2 group">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform group-hover:scale-105">
                                <Image src="/logoHireme1.png" width={150} height={100} />
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
                                    className="flex items-center space-x-1 text-gray-700 hover:text-[#26b596] transition-colors duration-200"
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
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
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
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#23a98c] hover:bg-gray-50"
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