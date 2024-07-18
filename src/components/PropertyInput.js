import React from 'react';

const PropertyInput = ({ label, name, value, onChange, type = 'text', unit, placeholder, className }) => {
  return (
    <div className="mb-2 flex flex-col">
      <label className="block text-xs text-gray-600 mb-1">{label}</label>
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          value={type === 'file' ? undefined : value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm ${className}`}
          style={unit ? { paddingRight: "2rem" } : {}}
        />
        {unit && (
          <span className="text-xs text-gray-500 absolute right-1 top-0 h-full flex items-center pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyInput;
