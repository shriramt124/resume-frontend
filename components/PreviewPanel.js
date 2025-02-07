import { useState, useRef } from 'react';
import { Maximize2, Palette, Layout } from 'lucide-react';
import ResumeModal from './ResumeModal';
import DownloadSection from './DownloadSection';
import { templates } from '@/lib/constants/templates';
import SidebarControls from "@/components/SidebarControls";
import TemplateSelector from "@/components/TemplateSelector";

export default function PreviewPanel({ formData }) {
    const [selectedTemplate, setSelectedTemplate] = useState(formData?.templateName || 'modern');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('styles'); // 'styles' or 'templates'
    const previewRef = useRef(null);

    const [fontStyles, setFontStyles] = useState({
        font_family: "sans-serif",
        font_color: "#000000",
        is_font_bold: false,
        is_font_italic: false
    });

    const Template = templates[selectedTemplate];

    const updateFontStyles = (newStyles) => {
        setFontStyles(prev => ({ ...prev, ...newStyles }));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-screen max-h-[calc(100vh-6rem)]">
            {/* Mobile Controls */}
            <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-sm rounded-lg">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <Palette className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setActiveTab(activeTab === 'styles' ? 'templates' : 'styles')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <Layout className="w-5 h-5" />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                ${isSidebarOpen ? 'block' : 'hidden'} 
                lg:block w-full lg:w-64 bg-white shadow rounded-lg
                fixed lg:relative inset-0 z-30 lg:z-auto
                ${isSidebarOpen ? 'bg-white' : ''}
            `}>
                <div className="h-full overflow-y-auto p-4">
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setActiveTab('styles')}
                            className={`flex-1 p-2 rounded-lg ${
                                activeTab === 'styles' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                            }`}
                        >
                            Styles
                        </button>
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`flex-1 p-2 rounded-lg ${
                                activeTab === 'templates' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                            }`}
                        >
                            Templates
                        </button>
                    </div>

                    {activeTab === 'styles' ? (
                        <SidebarControls
                            fontStyles={fontStyles}
                            updateFontStyles={updateFontStyles}
                        />
                    ) : (
                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                        />
                    )}
                </div>
            </div>

            {/* Main Preview */}
            <div className="flex-1 bg-white shadow rounded-lg flex flex-col h-full relative">
                {/* Preview Container */}
                <div
                    className="relative flex-1 overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    ref={previewRef}
                >
                    <div className="h-full overflow-y-auto p-4">
                        <div className="preview-content mx-auto" style={{
                            transform: 'scale(0.8)',
                            transformOrigin: 'top center',
                            maxWidth: '800px'
                        }}>
                            <Template
                                data={formData}
                                fontStyles={fontStyles}
                                isPreview={true}
                            />
                        </div>
                    </div>

                    {/* Preview Actions */}
                    <div className={`
                        absolute inset-0 
                        flex items-center justify-center 
                        transition-opacity duration-200
                        bg-black/50
                        ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
                        >
                            <Maximize2 className="w-5 h-5" />
                            <span>Full Preview</span>
                        </button>
                    </div>
                </div>

                {/* Download Section */}
                <div className="p-4 border-t">
                    <DownloadSection
                        formData={formData}
                        fontStyles={fontStyles}
                        templateName={selectedTemplate}
                    />
                </div>
            </div>

            {/* Modal */}
            <ResumeModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                formData={formData}
                fontStyles={fontStyles}
            />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}