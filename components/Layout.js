import Head from 'next/head'
import Navbar from './Navbar'
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
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