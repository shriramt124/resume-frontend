import React, {useEffect, useState} from 'react';
import {Briefcase, Check, Eye, Download, GraduationCap, Plus, Trophy, UserCircle2, X} from 'lucide-react';
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import PersonalInfo from '../components/sections/PersonalInfo';
import Experience from '../components/sections/Experience';
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Others from "@/components/sections/Others";
import {uuid} from "uuidv4";
import ResumeModal from "@/components/ResumeModal";
import DownloadSection from "@/components/DownloadSection";
// First, add this import at the top with other imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function Builder() {
    const [currentSection, setCurrentSection] = useState('personal');
    const [profileData, setProfileData] = useState({});
    const [userData, setUserData] = useState({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDownloadSection, setShowDownloadSection] = useState(false);
    const [formData, setFormData] = useState(null);
    const [fontStyles, setFontStyles] = useState({
        font_family: "sans-serif",
        font_color: "#000000",
        is_font_bold: false,
        is_font_italic: false
    });
    const [selectedTemplate, setSelectedTemplate] = useState(formData?.templateName || 'modern');
    const router = useRouter();
    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
        setFormData(prev => ({
            ...prev,
            templateName: template
        }));
    };
    useEffect(() => {
        // Commented out API-related code for development
        /*
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        const userData = JSON.parse(localStorage.getItem('profileData') || '{}');
        const loginUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        setUserData(loginUserData);
        setProfileData(userData);
        */
        // Sample placeholder data
        const sampleUserData = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        };

        const sampleProfileData = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            occupation: 'Software Developer',
            city: 'New York',
            country: 'USA',
            professional_summary: 'Experienced software developer with expertise in web technologies'
        };

        setUserData(sampleUserData);
        setProfileData(sampleProfileData);
    }, [router]);

    useEffect(() => {
        if (formData) {
            setFormData(prev => ({
                ...prev,
                templateName: selectedTemplate
            }));
        }
    }, [selectedTemplate]);

    useEffect(() => {
        if (profileData) {
            const jsonData = {
                template_id: 1,
                unique_id: uuid(),
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                occupation: '',
                city: '',
                country: '',
                pincode: '',
                dob: '',
                professional_description: '',
                professional_summary: '',
                job_title: [],
                employer: [],
                job_begin: [],
                job_end: [],
                job_description: [],
                college: [],
                degree: [],
                college_begin: [],
                college_end: [],
                college_description: [],
                language: [],
                skill: [],
                templateName: 'modern',
                internship_title: [],
                internship_summary: [],
                certificate_title: [],
                certificate_description: [],
                other_title: [],
                other_description: [],
            };

            const mappedData = {
                ...jsonData,
                first_name: profileData.first_name || '',
                last_name: profileData.last_name || '',
                email: profileData.email || '',
                phone: profileData.phone || '',
                occupation: profileData.occupation || '',
                city: profileData.city || '',
                country: profileData.country || '',
                pincode: profileData.pincode || '',
                dob: profileData.dob || '',
                professional_description: profileData.professional_description || '',
            };

            if (profileData.job && profileData.job.length > 0) {
                mappedData.job_title = profileData.job.map(job => job.job_title);
                mappedData.employer = profileData.job.map(job => job.employer);
                mappedData.job_begin = profileData.job.map(job => job.begin);
                mappedData.job_end = profileData.job.map(job => job.end);
                mappedData.job_description = profileData.job.map(job => job.description);
            }

            if (profileData.education && profileData.education.length > 0) {
                mappedData.college = profileData.education.map(edu => edu.college);
                mappedData.degree = profileData.education.map(edu => edu.degree);
                mappedData.college_begin = profileData.education.map(edu => edu.begin);
                mappedData.college_end = profileData.education.map(edu => edu.end);
                mappedData.college_description = profileData.education.map(edu => edu.description || null);
            }

            if (profileData.languages && profileData.languages.length > 0) {
                mappedData.language = [...new Set(profileData.languages.map(lang => lang.language))];
            }
            if (profileData.skills && profileData.skills.length > 0) {
                mappedData.skill = profileData.skills.map(skill => skill.skill);
            }
            setFormData(mappedData);
        }
    }, [profileData]);

    const sections = [
        {id: 'personal', title: 'Personal Info', icon: UserCircle2},
        {id: 'experience', title: 'Experience', icon: Briefcase},
        {id: 'education', title: 'Education', icon: GraduationCap},
        {id: 'skills', title: 'Skills', icon: Trophy},
        {id: 'others', title: 'Others', icon: Plus}
    ];

    const renderSection = () => {
        switch (currentSection) {
            case 'personal':
                return <PersonalInfo formData={formData} updateFormData={updateFormData}/>;
            case 'experience':
                return <Experience formData={formData} updateFormData={updateFormData}/>;
            case 'education':
                return <Education formData={formData} updateFormData={updateFormData}/>;
            case 'skills':
                return <Skills formData={formData} updateFormData={updateFormData}/>;
            case 'others':
                return <Others formData={formData} updateFormData={updateFormData}/>;
            default:
                return null;
        }
    };
    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        
            <div className="min-h-screen bg-gray-50">
                {/* Navigation Tabs */}
                <nav className="bg-white shadow-md mb-6 sticky top-0 z-20 border-b">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center py-1">
                            <div className="flex overflow-x-auto md:overflow-visible md:space-x-6 hide-scrollbar">
                                {sections.map((section, index) => {
                                    const Icon = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => {
                                                setCurrentSection(section.id);
                                                setCurrentSectionIndex(index);
                                            }}
                                            className={`
                                                relative py-4 px-4 md:px-5 whitespace-nowrap transition-all duration-300 ease-in-out
                                                flex items-center gap-2.5 min-w-max group
                                                ${currentSection === section.id
                                                    ? 'text-blue-600 font-medium'
                                                    : index <= currentSectionIndex
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500 hover:text-gray-700'
                                                }
                                            `}
                                        >
                                            <Icon className={`w-5 h-5 transition-transform duration-300 ${currentSection === section.id ? 'scale-110' : 'group-hover:scale-105'}`}/>
                                            <span className="font-medium">{section.title}</span>
                                            {index < currentSectionIndex && (
                                                <Check className="w-4 h-4 text-green-500 transition-opacity duration-200"/>
                                            )}
                                            {currentSection === section.id && (
                                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300 ease-out"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
                                >
                                    <Eye className="w-5 h-5"/>
                                    <span className="hidden md:inline font-medium">Preview</span>
                                </button>

                                <div className="flex items-center gap-3">
                                    <Select
                                        value={selectedTemplate}
                                        onValueChange={setSelectedTemplate}
                                    >
                                        <SelectTrigger className="w-[140px] h-[42px] border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                            <SelectValue placeholder="Select template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem key={`modern`} value={`modern`}>
                                                Modern Template
                                            </SelectItem>
                                            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                                                <SelectItem key={num} value={`demo${num}`}>
                                                    Template {num}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <button
                                        onClick={() => setShowDownloadSection(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 h-[42px] font-medium shadow-sm hover:shadow"
                                    >
                                        <Download className="w-5 h-5"/>
                                        <span className="hidden md:inline">Download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 mb-20">
                    <div className="w-full">
                        {formData && renderSection()}
                    </div>
                </div>

                {/* Download Section Modal */}
                {showDownloadSection && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="font-medium">Download Resume</h3>
                                <button
                                    onClick={() => setShowDownloadSection(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="w-5 h-5"/>
                                </button>
                            </div>
                            <DownloadSection
                                formData={formData}
                                fontStyles={fontStyles}
                                templateName={selectedTemplate}
                            />
                        </div>
                    </div>
                )}

                {/* Preview Modal */}
                <ResumeModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    formData={formData}
                    fontStyles={fontStyles}
                    onTemplateChange={handleTemplateChange}
                    selectedTemplate={selectedTemplate}
                    onDownload={() => {
                        setIsModalOpen(false);
                        setShowDownloadSection(true);
                    }}
                />
            </div>
       
    );
}