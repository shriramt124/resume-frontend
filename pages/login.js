import { useState, useEffect } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (error || success) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                setError('');
                setSuccess('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

            setSuccess('OTP sent successfully!');
            sessionStorage.setItem('verifyEmail', email);
            router.push('/verify-otp');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-full max-w-md px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-lg text-gray-600">
                            Login with your email address to continue
                        </p>
                    </div>

                    {/* Alert Messages */}
                    <div className={`transition-all duration-300 ease-in-out mb-6 ${
                        showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}>
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle className="flex items-center">
                                    <span className="mr-2">⚠️</span> Error
                                </AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert className="bg-green-50 text-green-700 border-green-200">
                                <AlertTitle className="flex items-center">
                                    <span className="mr-2">✅</span> Success
                                </AlertTitle>
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <form onSubmit={handleSendOTP} className="space-y-6">
                        <div className="w-full">
                            <label className="block text-gray-600 mb-2 text-md">
                                Email Address
                            </label>
                            <div className="relative rounded-lg border border-gray-300 hover:border-blue-400 focus-within:border-blue-500 transition-colors">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-transparent outline-none text-gray-900 placeholder-gray-500"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                            {email && !validateEmail(email) && (
                                <p className="mt-2 text-sm text-red-500">
                                    Please enter a valid email address
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !validateEmail(email)}
                            className="w-full py-3.5 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;