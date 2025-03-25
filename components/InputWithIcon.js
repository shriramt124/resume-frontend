import React from 'react';

const InputWithIcon = ({
    label,
    icon: Icon,
    type = 'text',
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    maxLength,
    className = '',
    error
}) => {
    const isDisabled = disabled;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-gray-600 mb-2 text-sm">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className={`relative rounded-lg border ${error ? 'border-red-300' : isDisabled ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-blue-400 focus-within:border-blue-500'} transition-colors ${className}`}>
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Icon className={`w-5 h-5 ${isDisabled ? 'text-gray-400' : 'text-blue-500'}`} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={isDisabled}
                    className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-transparent outline-none ${isDisabled ? 'text-gray-500' : ''}`}
                    placeholder={placeholder}
                    required={required}
                    maxLength={maxLength}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default InputWithIcon;