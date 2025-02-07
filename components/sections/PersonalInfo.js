import React, { useState } from 'react';
import FormField from "@/components/FormField";
import Editor from "react-simple-wysiwyg";
import SmartInputField from "@/components/SmartInputField";

const PersonalInfo = ({ formData, updateFormData }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                    <p className="text-gray-500 text-xs">Let's start with your basic information</p>
                </div>
            </div>

            <div className="space-y-3">
                {/* Name and Contact Section */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            label="First Name"
                            value={formData.first_name}
                            onChange={(e) => updateFormData('first_name', e.target.value)}
                            placeholder="e.g., John"
                            required
                            className="bg-white"
                        />
                        <FormField
                            label="Last Name"
                            value={formData.last_name}
                            onChange={(e) => updateFormData('last_name', e.target.value)}
                            placeholder="e.g., Doe"
                            required
                            className="bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            placeholder="e.g., john@example.com"
                            required
                            className="bg-white"
                        />
                        <FormField
                            label="Phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            placeholder="e.g., +1 234 567 8900"
                            className="bg-white"
                        />
                    </div>
                </div>

                {/* Location Section */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            label="City"
                            value={formData.city}
                            onChange={(e) => updateFormData('city', e.target.value)}
                            placeholder="e.g., New York"
                            className="bg-white"
                        />
                        <FormField
                            label="Country"
                            value={formData.country}
                            onChange={(e) => updateFormData('country', e.target.value)}
                            placeholder="e.g., United States"
                            className="bg-white"
                        />
                    </div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 gap-3">
                        <SmartInputField
                            label="Professional Summary Title"
                            value={formData.professional_summary}
                            onChange={(e) => updateFormData('professional_summary', e.target.value)}
                            currentDescription={formData.professional_description}
                            onDescriptionChange={(e) => updateFormData('professional_description', e.target.value)}
                            placeholder="e.g., Working as full time backend developer."
                            className="bg-white"
                            promptType="provide a degree or academic details based on this degree:"
                        />

                    </div>
                </div>

                {/* Professional Summary Editor */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-600">Professional Summary</label>
                    </div>
                    <div className="relative">
                        <Editor
                            value={formData.professional_description}
                            onChange={(e) => updateFormData('professional_description', e.target.value)}
                            className="w-full min-h-[120px] border border-gray-200 rounded-lg
            focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;