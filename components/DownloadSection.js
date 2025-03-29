import { useState } from 'react';
import { Download, X, AlertCircle } from 'lucide-react';

const DownloadSection = ({ formData, fontStyles, templateName }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Make downloadPDF accessible as a static method
    DownloadSection.prototype.downloadPDF = async function (retryCount = 0) {
        return downloadPDF(retryCount);
    };

    const validateFormData = () => {
        if (!formData) return "Please fill in the resume details";
        if (!formData.first_name) return "First name is required";
        if (!formData.last_name) return "Last name is required";
        if (!formData.email) return "Email is required";
        if (!formData.phone) return "Phone number is required";
        return null;
    };

    const downloadPDF = async (retryCount = 0) => {
        try {
            const validationError = validateFormData();
            if (validationError) {
                setError(validationError);
                return;
            }

            setIsLoading(true);
            setError(null);

            // Log the request payload for debugging
            const payload = {
                ...formData,
                ...fontStyles,
                templateName: templateName,
            };
            console.log("Sending request with payload:", payload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generate-resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(payload)
            });
            console.log("Response status:", response.status, "Response headers:", Object.fromEntries([...response.headers]));
            console.log("Response is:", response);

            // Check if response is JSON (error) or blob (PDF)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                console.log("Error data received:", errorData);

                if (!response.ok) {
                    if (errorData.errors) {
                        // Laravel validation errors
                        const firstError = Object.values(errorData.errors)[0][0];
                        throw new Error(firstError);
                    }

                    // Other API errors
                    switch (errorData.message?.toLowerCase()) {
                        case 'the first name field is required.':
                            throw new Error('Please enter your first name');
                        case 'unauthenticated.':
                            throw new Error('Your session has expired. Please log in again');
                        default:
                            throw new Error(errorData.message || 'PDF generation failed');
                    }
                }
            }

            // Verify we have a valid response before proceeding
            if (!response.ok) {
                // Special handling for 500 Internal Server Error
                if (response.status === 500) {
                    console.error('Server error (500) occurred when generating PDF');

                    // Log additional information that might help diagnose the issue
                    console.log('Request payload size:', JSON.stringify(payload).length);
                    console.log('Template being used:', templateName);

                    // Check if token might be expired
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('Authentication token is missing. Please log in again.');
                    }

                    // Check payload size and provide specific error message
                    const payloadSize = JSON.stringify(payload).length;
                    if (payloadSize > 100000) {
                        throw new Error('Your resume data is too large for processing. Please try simplifying your descriptions or removing some content.');
                    }

                    // Implement retry logic (max 3 retries with increasing delay)
                    if (retryCount < 3) {
                        // Exponential backoff: 3s, 6s, 9s
                        const delayMs = 3000 * (retryCount + 1);
                        console.log(`Retrying PDF generation (attempt ${retryCount + 1} of 3) after ${delayMs / 1000}s delay...`);
                        setError(`Server error occurred. Retrying in ${delayMs / 1000}s (attempt ${retryCount + 1}/3)...`);
                        setIsLoading(false);
                        setTimeout(() => downloadPDF(retryCount + 1), delayMs);
                        return;
                    }
                }

                throw new Error(`Server responded with status: ${response.status}. Please try again later or contact support if the issue persists.`);
            }

            // Get the blob data
            const blob = await response.blob();

            // Verify the blob is valid and has content
            if (!blob || blob.size === 0) {
                throw new Error('Received empty PDF data from server');
            }

            // Create a meaningful filename
            const filename = `${formData.first_name}_${formData.last_name}_Resume.pdf`;

            // Handle download for IE/Edge
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                // Create object URL
                const url = window.URL.createObjectURL(blob);

                // Create download link
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;

                // Append to document, click, and clean up
                document.body.appendChild(link);
                link.click();

                // Small delay before revoking to ensure download starts
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                }, 100);
            }
        } catch (error) {
            console.error('Download failed:', error);

            // More descriptive error messages based on common issues
            if (error.message.includes('500')) {
                // Check payload size first as it's a common cause of 500 errors
                const payloadSize = JSON.stringify({ ...formData, ...fontStyles, templateName }).length;
                console.log('Payload size (bytes):', payloadSize);

                if (payloadSize > 100000) {
                    console.warn('Large payload detected, this might be causing the server error');
                    setError('Your resume data is too large for processing. Please try simplifying your descriptions or removing some content, especially from long text fields.');
                } else {
                    setError('The server encountered an error while generating your PDF. This could be due to temporary server issues. Please try again in a few minutes or try a different template.');
                }
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                setError('Network error: Please check your internet connection and try again.');
            } else if (error.message.includes('timeout')) {
                setError('Request timed out: The server took too long to respond. Please try again later.');
            } else if (error.message.includes('Authentication token')) {
                setError('Your session has expired. Please refresh the page and log in again.');
            } else {
                setError(error.message || 'Something went wrong. Please try again later');
            }

            // Log additional debugging information
            console.log('Token available:', !!localStorage.getItem('token'));
            console.log('Template name:', templateName);
            console.log('Form data keys:', formData ? Object.keys(formData) : 'No form data');
            console.log('Font styles:', fontStyles);

            // Additional checks for potential issues
            if (!formData || Object.keys(formData).length === 0) {
                console.error('Form data is empty or invalid');
                setError('Resume data appears to be invalid. Please refresh the page and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 border-t space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg relative overflow-hidden">
                    <div className="p-4 flex items-start">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 flex-1 pr-8">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                        >
                            <span className="sr-only">Dismiss</span>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="h-1 w-full bg-red-100">
                        <div className="h-full w-full bg-red-400 animate-progress origin-left"></div>
                    </div>
                </div>
            )}

            <button
                onClick={downloadPDF}
                disabled={isLoading}
                className={`w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg 
                   flex items-center justify-center space-x-2 transition-all duration-200
                   ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
            >
                <Download className={`w-5 h-5 ${isLoading ? 'animate-bounce' : ''}`} />
                <span>{isLoading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
        </div>
    );
};

export default DownloadSection;