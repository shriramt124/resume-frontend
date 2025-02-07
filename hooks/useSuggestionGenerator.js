import { useState } from 'react';
import axios from 'axios';

export const useSuggestionGenerator = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const generateSuggestions = async (title, customPrompt) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: customPrompt || `Provide a list of professional description of this job title : ${title}.`,
                        },
                        {
                            role: "user",
                            content: customPrompt
                                ? `${customPrompt} : ${title}`
                                : `Give me a list of professional description of this job title : ${title}.`
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const skillsData = response.data.choices[0].message.content
                .split("\n")
                .map(suggestion => suggestion.trim())
                .filter(suggestion => suggestion.length > 0)
                .map(suggestion => {
                    // Remove numerical prefixes like "1. ", "2. ", etc.
                    return suggestion.replace(/^\d+\.\s*/, '');
                });
            setSuggestions(skillsData);
            return skillsData; // Return the suggestions for optional external handling
        } catch (error) {
            console.error('Error generating suggestions:', error);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    return {
        suggestions,
        isLoading,
        searchTerm,
        setSearchTerm,
        generateSuggestions,
        setSuggestions
    };
};
