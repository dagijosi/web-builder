import React from 'react';

const PropertyInput = ({ label, name, value, onChange, type = 'text', unit, placeholder, className }) => {
  return (
     <div className="mb-4">
    <label className="block mb-2 text-sm text-gray-600">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={type === 'file' ? undefined : value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md ${className}`}
        style={unit ? { paddingRight: "2.5rem" } : {}}
      />
      {unit && (
        <span className="text-xs text-gray-500 absolute right-2 top-0 h-full flex items-center pointer-events-none">
          {unit}
        </span>
      )}
    </div>
  </div>
  );
};

export default PropertyInput;
