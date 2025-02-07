import Image from 'next/image';
import { Check } from 'lucide-react';
import { templates } from '@/lib/constants/templates';

export default function TemplateSelector({ selectedTemplate, setSelectedTemplate, onTemplateSelect }) {
    const handleTemplateClick = (key) => {
        setSelectedTemplate(key);
        if (onTemplateSelect) {
            onTemplateSelect(key);
        }
    };

    return (
        <div className="space-y-4">
            {Object.entries(templates).map(([key, Template]) => (
                <button
                    key={key}
                    onClick={() => handleTemplateClick(key)}
                    className={`
                       w-full relative rounded-lg overflow-hidden border-2 transition-all
                       ${selectedTemplate === key ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
                   `}
                >
                    <div className="relative aspect-[8.5/11] w-full">
                        <Image
                            src={`/templates/${key}.png`}
                            alt={`${key} template`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-2 bg-white border-t">
                        <div className="flex items-center justify-between">
                           <span className="capitalize text-sm font-medium">
                               {key} Template
                           </span>
                            {selectedTemplate === key && (
                                <Check className="w-4 h-4 text-blue-500" />
                            )}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}