import React, { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';

const SuggestionDropdown = ({ onSuggestionClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Fetch suggestions from the backend
        // const fetchSuggestions = async () => {
        //     try {
        //         const response = await fetch('/api/suggestions'); // Adjust the endpoint as needed
        //         const data = await response.json();
        //         setSuggestions(data.suggestions);
        //     } catch (error) {
        //         console.error('Error fetching suggestions:', error);
        //     }
        // };
        // fetchSuggestions();
        // Use dummy data for suggestions
        const dummySuggestions = [
            "Experienced professional with a proven track record",
            "Results-driven individual with expertise in",
            "Innovative problem-solver with strong analytical skills",
            "Dedicated team player with excellent communication abilities",
            "Strategic thinker with a focus on continuous improvement"
        ];
        setSuggestions(dummySuggestions);
    }, []);

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
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
            >
                <Plus className="w-4 h-4" />
                Get help with writing
                <X className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fadeIn">
                    <div className="flex justify-between items-center p-2 border-b">
                        <span className="text-sm font-medium text-gray-700">Suggested phrases</span>
                        <button 
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestionDropdown;