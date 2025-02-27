import React, {useEffect, useState} from 'react';
import { X, Palette, Eye, Download, Layout } from 'lucide-react';
import { templates } from "@/lib/constants/templates";
import TemplateSelector from "@/components/TemplateSelector";
import SidebarControls from "@/components/SidebarControls";
import DownloadSection from "@/components/DownloadSection";
import {useRouter} from "next/router";

const ResumeModal = ({
                         isOpen,
                         onRequestClose,
                         formData,
                         fontStyles: initialFontStyles,
                         onTemplateChange,
                         selectedTemplate: parentSelectedTemplate,
                         defaultData
                     }) => {
    const [fontStyles, setFontStyles] = useState(initialFontStyles);
    const [mobileView, setMobileView] = useState('preview');
    const router = useRouter();

    if (!isOpen) return null;

    // Use the parent's selectedTemplate prop directly
    const TemplateComponent = templates?.[parentSelectedTemplate] || templates?.modern;
    if (!TemplateComponent) return null;

    const handleTemplateChange = (template) => {
        if (onTemplateChange) {
            onTemplateChange(template);
        }
    };

    const PreviewContent = () => {
        return (
            <div className="h-full flex flex-col bg-gray-50">
                {/* Header */}
                <div className="flex items-center justify-end px-6 py-4 bg-white border-b">
                    <button
                        onClick={onRequestClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Preview area */}
                <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
                    <div className="bg-white shadow-xl rounded-lg">
                        {/* Preview container */}
                        <div className="">
                            <div className="transform scale-75 origin-top">
                                <div className="p-8">
                                    <TemplateComponent
                                        data={formData}
                                        fontStyles={fontStyles}
                                        isModalView={true}
                                        defaultData={defaultData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-b from-transparent to-white h-24 absolute bottom-0 left-0 right-0 pointer-events-none"/>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className="h-screen max-w-screen-2xl mx-auto">
                <div className="h-full flex">
                    {/* Sidebar */}
                    <div className="hidden lg:flex w-80 flex-col bg-white border-r">
                        <div className="p-4 border-b">
                            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                                {['styles', 'templates'].map((view) => (
                                    <button
                                        key={view}
                                        onClick={() => setMobileView(view)}
                                        className={`
                                            flex-1 py-2 px-4 rounded-md font-medium 
                                            transition-all capitalize
                                            ${mobileView === view
                                            ? 'bg-white text-blue-600 shadow'
                                            : 'text-gray-600 hover:bg-white/50'
                                        }`}
                                    >
                                        {view}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {mobileView === 'styles' ? (
                                <SidebarControls
                                    fontStyles={fontStyles}
                                    updateFontStyles={(newStyles) =>
                                        setFontStyles((prev) => ({ ...prev, ...newStyles }))
                                    }
                                />
                            ) : (
                                <TemplateSelector
                                    selectedTemplate={parentSelectedTemplate}
                                    setSelectedTemplate={handleTemplateChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white">
                        <PreviewContent />
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden">
                {mobileView !== 'preview' && (
                    <div className="fixed inset-0 bg-white">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-lg font-semibold capitalize">
                                    {mobileView === 'styles'
                                        ? 'Customize Style'
                                        : mobileView === 'templates'
                                            ? 'Choose Template'
                                            : 'Download Resume'}
                                </h2>
                                <button
                                    onClick={() => setMobileView('preview')}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                {mobileView === 'styles' && (
                                    <SidebarControls
                                        fontStyles={fontStyles}
                                        updateFontStyles={(newStyles) =>
                                            setFontStyles((prev) => ({ ...prev, ...newStyles }))
                                        }
                                    />
                                )}
                                {mobileView === 'templates' && (
                                    <TemplateSelector
                                        selectedTemplate={parentSelectedTemplate}
                                        setSelectedTemplate={(template) => {
                                            handleTemplateChange(template);
                                            setMobileView('preview');
                                        }}
                                    />
                                )}
                                {mobileView === 'download' && (
                                    <DownloadSection
                                        formData={formData}
                                        fontStyles={fontStyles}
                                        templateName={parentSelectedTemplate}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Navigation */}
                <nav className="fixed bottom-0 inset-x-0 bg-white border-t pb-safe-area">
                    <div className="max-w-md mx-auto px-4 py-2">
                        <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-xl">
                            {[
                                { id: 'preview', icon: Eye, label: 'Preview' },
                                { id: 'styles', icon: Palette, label: 'Style' },
                                { id: 'templates', icon: Layout, label: 'Template' },
                                { id: 'download', icon: Download, label: 'Save' },
                            ].map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setMobileView(id)}
                                    className={`
                                        flex flex-col items-center py-2 px-1 rounded-lg
                                        transition-all
                                        ${mobileView === id
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-white/50'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 mb-1 ${mobileView === id ? 'scale-110' : ''}`} />
                                    <span className="text-xs font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default ResumeModal;