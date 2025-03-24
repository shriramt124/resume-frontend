import Head from 'next/head'
import Navbar from './Navbar'
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // List of public routes that don't require authentication
    const publicRoutes = [
        '/login',
        '/verify-otp',
        '/complete-profile',
        '/unauthorized'
    ];

    useEffect(() => {
        // Check if the current route is a public route
        const isPublicRoute = publicRoutes.some(route => router.pathname === route);

        // If it's not a public route, check for authentication
        if (!isPublicRoute) {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            }
        }

        setIsLoading(false);
    }, [router.pathname]);

    // Don't render anything while checking authentication
    if (isLoading && router.pathname !== '/login') {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-300"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>HireMeAI - Create Professional Resumes</title>
                <meta name="description" content="Create professional resumes with our easy-to-use builder" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;