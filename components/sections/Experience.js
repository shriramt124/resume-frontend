import React, { useState, useEffect } from "react";
import FormField from "@/components/FormField";
import Editor from "react-simple-wysiwyg";
import { ChevronDown, Trash2, Plus } from 'lucide-react';
import SmartInputField from "@/components/SmartInputField";
import MonthYearSelector from "@/components/MonthYearSelector";

const Experience = ({ formData, updateFormData }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!formData.job_title?.length) {
            initializeEmptyExperience();
        }
    }, []);

    const initializeEmptyExperience = () => {
        updateFormData('job_title', ['']);
        updateFormData('employer', ['']);
        updateFormData('job_begin', ['']);
        updateFormData('job_end', ['']);
        updateFormData('job_description', ['']);
    };

    const addExperience = () => {
        updateFormData('job_title', [...(formData.job_title || []), '']);
        updateFormData('employer', [...(formData.employer || []), '']);
        updateFormData('job_begin', [...(formData.job_begin || []), '']);
        updateFormData('job_end', [...(formData.job_end || []), '']);
        updateFormData('job_description', [...(formData.job_description || []), '']);
        setActiveIndex(formData.job_title?.length || 0);
    };

    const removeExperience = (indexToRemove, e) => {
        e.stopPropagation();
        if (!formData.job_title?.length || formData.job_title.length <= 1) return;

        ['job_title', 'employer', 'job_begin', 'job_end', 'job_description'].forEach(key => {
            const newArray = [...formData[key]];
            newArray.splice(indexToRemove, 1);
            updateFormData(key, newArray);
        });

        setActiveIndex(Math.max(0, activeIndex - 1));
    };

    if (!formData.job_title?.length) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
                    <p className="text-gray-500 text-xs">Add your work history</p>
                </div>
                <button
                    onClick={addExperience}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg
                    hover:bg-blue-100 transition-all duration-300 flex items-center justify-center
                    gap-2 text-sm font-medium shadow-sm hover:shadow transform hover:scale-[1.02]"
                >
                    <Plus className="w-4 h-4" />
                    Add Experience
                </button>
            </div>

            <div className="space-y-3">
                {formData.job_title.map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                        <div
                            onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50
                                hover:bg-gray-100 transition-all duration-300 cursor-pointer
                                border-b border-gray-100"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                                <span className="font-medium text-gray-700">
                                    {formData.job_title[index] || 'New Position'}
                                </span>
                                {formData.employer[index] && (
                                    <span className="text-gray-500">
                                        at {formData.employer[index]}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                {formData.job_title.length > 1 && (
                                    <button
                                        onClick={(e) => removeExperience(index, e)}
                                        className="p-1.5 text-gray-400 hover:text-red-500
                                            hover:bg-red-50 rounded-full transition-all duration-300
                                            transform hover:scale-110"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200
                                        ${activeIndex === index ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </div>

                        <div className={`transition-all duration-200 ease-in-out
                            ${activeIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                            overflow-hidden`}>
                            <div className="p-3 bg-white space-y-3">
                                <div className="grid grid-cols-1 gap-3">
                                    <FormField
                                        label="Employer"
                                        value={formData.employer[index] || ''}
                                        onChange={(e) => {
                                            const newArray = [...formData.employer];
                                            newArray[index] = e.target.value;
                                            updateFormData('employer', newArray);
                                        }}
                                        placeholder="e.g., Google"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <MonthYearSelector
                                        label="Start Date"
                                        value={formData.job_begin[index] || ''}
                                        onChange={(value) => {
                                            const newArray = [...formData.job_begin];
                                            newArray[index] = value;
                                            updateFormData('job_begin', newArray);
                                        }}
                                        placeholder="Select start date"
                                        required
                                    />
                                    <MonthYearSelector
                                        label="End Date"
                                        value={formData.job_end[index] || ''}
                                        onChange={(value) => {
                                            const newArray = [...formData.job_end];
                                            newArray[index] = value;
                                            updateFormData('job_end', newArray);
                                        }}
                                        placeholder="Select end date"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <SmartInputField
                                        label="Job Title"
                                        value={formData.job_title[index] || ''}
                                        onChange={(e) => {
                                            const newArray = [...formData.job_title];
                                            newArray[index] = e.target.value;
                                            updateFormData('job_title', newArray);
                                        }}
                                        currentDescription={formData.job_description}
                                        onDescriptionChange={(e) => updateFormData('job_description', e.target.value)}
                                        placeholder="e.g., Software Engineer"
                                        className="bg-white"
                                        promptType="provide a job experience details based on this title:"
                                        index={index}
                                    />
                                </div>

                                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm text-gray-600">Description</label>
                                    </div>
                                    <Editor
                                        value={formData.job_description[index] || ''}
                                        onChange={(e) => {
                                            const newArray = [...formData.job_description];
                                            newArray[index] = e.target.value;
                                            updateFormData('job_description', newArray);
                                        }}
                                        className="w-full min-h-[120px] border border-gray-200 rounded-lg
                                            focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500
                                            transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;