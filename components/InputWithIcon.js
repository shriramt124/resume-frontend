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
            <div className={`relative rounded-lg border ${error ? 'border-red-300' : isDisabled ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-teal-400 focus-within:border-teal-500'} transition-colors ${className}`}>
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Icon className={`w-5 h-5 ${isDisabled ? 'text-gray-400' : 'text-teal-500'}`} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={isDisabled}
                    className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 focus:border-teal-500 bg-transparent outline-none ${isDisabled ? 'text-gray-500' : ''} focus:ring-2 focus:ring-teal-500/20`}
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