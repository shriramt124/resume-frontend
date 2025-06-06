import React, { useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import ContentItem from "@/components/ContentItem";
import SmartInputField from "@/components/SmartInputField";
import SuggestionDropdown from "@/components/SuggestionDropdown";

const InternshipTab = ({
                           formData,
                           updateFormData,
                           activeIndex,
                           setActiveIndex
                       }) => {
    useEffect(() => {
        if (!formData.internship_title?.length) {
            initializeEmptyInternship();
        }
    }, []);

    const initializeEmptyInternship = () => {
        updateFormData('internship_title', ['']);
        updateFormData('internship_summary', ['']);
    };

    const handleSuggestionClick = (suggestion, index) => {
        const currentContent = formData.internship_summary[index] || '';
        const bulletPoint = `<li>${suggestion}</li>`;

        let newContent;
        if (!currentContent) {
            newContent = `<ul>${bulletPoint}</ul>`;
        } else if (currentContent.includes('</ul>')) {
            // Check if the suggestion is already present
            if (currentContent.includes(bulletPoint)) {
                // Remove the suggestion
                newContent = currentContent.replace(bulletPoint, '').replace(/<ul>\s*<\/ul>/, '');
            } else {
                // Add the suggestion before the closing ul tag
                newContent = currentContent.replace('</ul>', `${bulletPoint}</ul>`);
            }
        } else {
            newContent = `<ul>${bulletPoint}</ul>`;
        }

        const newArray = [...formData.internship_summary];
        newArray[index] = newContent;
        updateFormData('internship_summary', newArray);
    };

    const isSuggestionSelected = (suggestion, index) => {
        const currentContent = formData.internship_summary[index] || '';
        return currentContent.includes(`<li>${suggestion}</li>`);
    };

    const removeItem = (index, type, e) => {
        e.stopPropagation();
        if (!formData.internship_title?.length || formData.internship_title.length <= 1) return;

        ['internship_title', 'internship_summary'].forEach(key => {
            const newArray = [...formData[key]];
            newArray.splice(index, 1);
            updateFormData(key, newArray);
        });

        setActiveIndex(Math.max(0, activeIndex - 1));
    };

    if (!formData.internship_title?.length) {
        return null;
    }

    return (
        <div className="space-y-3">
            {formData.internship_title.map((_, index) => (
                <ContentItem
                    key={index}
                    title={formData.internship_title[index] || 'New Internship'}
                    isActive={activeIndex === index}
                    canDelete={formData.internship_title.length > 1}
                    onDelete={(e) => removeItem(index, 'internship', e)}
                    onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                >
                    <div className="p-3 bg-white space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                            <SmartInputField
                                label="Internship Title"
                                value={formData.internship_title[index] || ''}
                                onChange={(e) => {
                                    const newArray = [...formData.internship_title];
                                    newArray[index] = e.target.value;
                                    updateFormData('internship_title', newArray);
                                }}
                                currentDescription={formData.internship_summary}
                                onDescriptionChange={(e) => updateFormData('internship_summary', e.target.value)}
                                placeholder="e.g., UI/UX Design Intern"
                                className="bg-white"
                                promptType="provide a internship details based on this title:"
                                index={index}
                            />
                        </div>
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-gray-600">Description</label>
                                <SuggestionDropdown 
                                    onSuggestionClick={(suggestion) => handleSuggestionClick(suggestion, index)}
                                    title={formData.internship_title[index] || 'internship'}
                                    customPrompt="Provide a comprehensive list of detailed professional descriptions and achievements for this internship role:"
                                    isSuggestionSelected={(suggestion) => isSuggestionSelected(suggestion, index)}
                                />
                            </div>
                            <Editor
                                value={formData.internship_summary[index] || ''}
                                onChange={(e) => {
                                    const newArray = [...formData.internship_summary];
                                    newArray[index] = e.target.value;
                                    updateFormData('internship_summary', newArray);
                                }}
                                className="w-full min-h-[120px] border border-gray-200 rounded-lg
                                    focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
                            />
                        </div>
                    </div>
                </ContentItem>
            ))}
        </div>
    );
};

export default InternshipTab;