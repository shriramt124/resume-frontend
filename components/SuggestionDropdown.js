import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Loader2, ChevronDown } from 'lucide-react';
import { useSuggestionGenerator } from '@/hooks/useSuggestionGenerator';

export default function SuggestionDropdown({ onSuggestionClick, title = 'professional summary', customPrompt = null }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [previousTitle, setPreviousTitle] = useState(title);
    const dropdownRef = useRef(null);
    const {
        suggestions,
        isLoading,
        generateSuggestions,
        setSuggestions
    } = useSuggestionGenerator();

    // Generate professional summary suggestions when dropdown is opened
    const handleDropdownToggle = () => {
        const newState = !isDropdownOpen;
        setIsDropdownOpen(newState);

        // Generate suggestions when opening the dropdown
        if (newState) {
            // Check if title has changed since last time or if suggestions are empty
            if (previousTitle !== title || suggestions.length === 0) {
                // Clear previous suggestions when title changes
                if (previousTitle !== title) {
                    setSuggestions([]);
                }
                // Update previous title
                setPreviousTitle(title);
                // Always use the custom prompt if provided
                const promptType = customPrompt || `Provide a list of professional summary phrases for a resume based on the role:`;
                generateSuggestions(title, promptType);
            }
        }
    };

    // Regenerate suggestions when title changes while dropdown is open
    useEffect(() => {
        if (isDropdownOpen && title) {
            // Clear previous suggestions when title changes
            setSuggestions([]);
            // Update previous title
            setPreviousTitle(title);
            // Always use the custom prompt if provided
            const promptType = customPrompt || `Provide a list of professional summary phrases for a resume based on the role:`;
            generateSuggestions(title, promptType);
        }
    }, [title]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleDropdownToggle}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
            >
                <Plus className="w-4 h-4" />
                Get help with writing
                <ChevronDown className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fadeIn">
                    <div className="flex justify-between items-center p-2 border-b">
                        <span className="text-sm font-medium text-gray-700">Suggested phrases for {title}</span>
                        <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-4">
                                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                <span className="ml-2 text-sm text-gray-600">Generating suggestions...</span>
                            </div>
                        ) : suggestions.length > 0 ? (
                            suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        onSuggestionClick(suggestion);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Plus className="w-3 h-3 text-blue-500" />
                                    {suggestion}
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-3 text-sm text-gray-500">
                                No suggestions available
                            </div>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
}