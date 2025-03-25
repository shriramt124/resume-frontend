import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Image from 'next/image';

import {
    Menu,
    X,
    UserCircle2,
    CheckCircle2,
    ExternalLink
} from 'lucide-react';

const Navbar = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [userName, setUserName] = useState('');
    const [activeProfileId, setActiveProfileId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navLinks = [
        // { title: 'Home', href: '/', icon: Home },
        // { title: 'Templates', href: '/templates', icon: FileText },
        // { title: 'About', href: '/about', icon: Info },
        // { title: 'Contact', href: '/contact', icon: Phone },
    ];



    useEffect(() => {
        console.log(router.pathname)
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            setIsAuthenticated(!!token);
            setUserName(userData.name || 'User');
        };

        checkAuth();
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        setUserName(userData.name || '');



        // Get active profile ID from URL if present
        const { userProfileId } = router.query;
        if (userProfileId) {
            setActiveProfileId(parseInt(userProfileId));
        }

        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [router.query, isAuthenticated]);





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
        setIsOpen(false);
    };
    // Simplified auth content rendering
    const renderAuthContent = () => {
        if (!isAuthenticated) return null;

        return (
            <div className="relative">
                <div className="flex items-center space-x-2 p-2 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-[#0cc39b] flex items-center justify-center">
                        <UserCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{userName}</span>
                </div>
            </div>
        );
    };

    // Simplified mobile auth content
    const renderMobileAuthContent = () => {
        if (!isAuthenticated) return null;

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

                        {/* Render auth content based on authentication status */}
                        {router.pathname !== "/login" && renderAuthContent()}

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
                            {router.pathname !== "/login" && (
                                isOpen ? (
                                    <X className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="h-6 w-6" aria-hidden="true" />
                                )
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


                        {/* Render mobile auth content based on authentication status */}
                        {router.pathname !== "/login" && renderMobileAuthContent()}



                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;