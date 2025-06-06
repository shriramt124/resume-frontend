const FormField = ({ label, type = "text", value, onChange, placeholder, required = false }) => (
    <div className="relative">
        <label className="absolute -top-2.5 left-2 bg-white px-1 text-sm text-gray-600">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out mt-1"
            required={required}
        />
    </div>
);
export default FormField;