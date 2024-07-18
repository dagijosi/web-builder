import React from 'react';

const DropdownInput = ({ label, name, value, onChange, placeholder = "", className = "", displayOptions = [] }) => {
  return (
    <div className="mb-2 flex flex-col">
      <label className="block text-xs text-gray-600 mb-1">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm ${className}`}
      >
        {displayOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
