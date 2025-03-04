import React, { useEffect, useState } from 'react';
import { Briefcase, Check, Eye, Download, GraduationCap, Plus, Trophy, UserCircle2, X } from 'lucide-react';
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import PersonalInfo from '../components/sections/PersonalInfo';
import Experience from '../components/sections/Experience';
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Others from "@/components/sections/Others";
import { uuid } from "uuidv4";
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
        // This will run when the component mounts and when the router query changes
        if (router.isReady && router.query.templateId) {
            const template = router.query.templateId;
            if (template !== selectedTemplate) {
                setSelectedTemplate(template);
            }
        }
    }, [router.isReady, router.query, selectedTemplate]); // Don't include formData here

    const defaultData = {
        first_name: "John",
        last_name: "Doe",
        occupation: "Software Engineer",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        city: "New York",
        country: "USA",
        professional_description: "<p>Experienced software engineer with a passion for building scalable and efficient web applications. Proficient in JavaScript, React, and Node.js.</p>",
        job_title: ["Senior Software Engineer", "Software Engineer"],
        employer: ["Tech Corp", "Innovate Inc"],
        job_begin: ["2018", "2015"],
        job_end: ["Present", "2018"],
        job_description: [
            "<p>Led a team of developers to build a scalable e-commerce platform.</p>",
            "<p>Developed and maintained web applications using React and Node.js.</p>"
        ],
        college: ["University of Tech", "State College"],
        degree: ["Bachelor of Science in Computer Science", "Associate Degree in IT"],
        college_begin: ["2011", "2009"],
        college_end: ["2015", "2011"],
        college_description: [
            "<p>Graduated with honors, focusing on software development and algorithms.</p>",
            "<p>Completed foundational courses in programming and systems design.</p>"
        ],
        internship_title: ["Software Development Intern"],
        internship_summary: [
            "<p>Assisted in the development of a mobile application using Flutter.</p>"
        ],
        certificate_title: ["Certified JavaScript Developer"],
        certificate_description: [
            "<p>Completed advanced JavaScript courses and passed the certification exam.</p>"
        ],
        other_title: ["Volunteer Work"],
        other_description: [
            "<p>Volunteered as a mentor for coding bootcamps, helping students learn programming basics.</p>"
        ],
        skill: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        language: ["English", "Spanish"]
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        const userData = JSON.parse(localStorage.getItem('profileData') || '{}');
        const loginUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        setUserData(loginUserData);
        setProfileData(userData);
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
        { id: 'personal', title: 'Personal Info', icon: UserCircle2 },
        { id: 'experience', title: 'Experience', icon: Briefcase },
        { id: 'education', title: 'Education', icon: GraduationCap },
        { id: 'skills', title: 'Skills', icon: Trophy },
        { id: 'others', title: 'Others', icon: Plus }
    ];

    const renderSection = () => {
        switch (currentSection) {
            case 'personal':
                return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
            case 'experience':
                return <Experience formData={formData} updateFormData={updateFormData} />;
            case 'education':
                return <Education formData={formData} updateFormData={updateFormData} />;
            case 'skills':
                return <Skills formData={formData} updateFormData={updateFormData} />;
            case 'others':
                return <Others formData={formData} updateFormData={updateFormData} />;
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
            <nav className="bg-white shadow-md sticky top-0 z-20 border-b transition-all duration-300">
                <div className="w-full mx-auto px-4 py-2 md:py-3">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                        {/* Navigation Tabs */}
                        <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 w-full">
                            <div className="flex space-x-2 md:space-x-4 w-full">
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
                                                relative py-2.5 px-4 rounded-lg transition-all duration-300 transform
                                                flex items-center gap-2 min-w-[120px] md:min-w-0
                                                ${currentSection === section.id
                                                    ? 'bg-blue-50 text-blue-600 font-medium scale-[1.02] shadow-sm'
                                                    : index <= currentSectionIndex
                                                        ? 'text-gray-700 hover:bg-gray-50 hover:scale-[1.02]'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:scale-[1.02]'
                                                }
                                            `}
                                        >
                                            <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${currentSection === section.id ? 'scale-110' : ''}`} />
                                            <span className="text-sm whitespace-nowrap font-medium">{section.title}</span>
                                            {index < currentSectionIndex && (
                                                <Check className="w-3 h-3 text-green-500 absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300 text-sm font-medium min-w-[100px] justify-center"
                            >
                                <Eye className="w-4 h-4" />
                                <span>Preview</span>
                            </button>
                            <Select
                                value={selectedTemplate}
                                onValueChange={setSelectedTemplate}
                            >
                                <SelectTrigger className="w-[130px] md:w-[150px] h-[42px] text-sm border-gray-200 hover:border-gray-300 bg-gray-50 transition-all duration-300">
                                    <SelectValue placeholder="Template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="modern" value="modern">
                                        Template
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
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md transform hover:translate-y-[-1px] flex-1 md:flex-none justify-center min-w-[120px]"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="w-full mx-auto px-4 mb-20">
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
                                <X className="w-5 h-5" />
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
                defaultData={defaultData}
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