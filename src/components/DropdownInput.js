import React from 'react';

const DropdownInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  displayOptions = [],
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm text-gray-600">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md ${className}`}
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
