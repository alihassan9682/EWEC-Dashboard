/** @format */

import React from "react";
import Select from "react-select";

const CustomSelect = ({
  id,
  name,
  value,
  onChange,
  options,
  isMulti = false,
  title,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#007bff" : "#6b7280",
      "&:hover": { borderColor: "#007bff" },
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
      borderRadius: "0.375rem",
      minHeight: "2.5rem",
      backgroundColor: "#f9fafb",
      padding: "0.375rem",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
      borderRadius: "0.375rem",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#e2e8f0"
        : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#111827",
      "&:hover": {
        backgroundColor: state.isSelected ? "#0056b3" : "#e2e8f0",
      },
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#007bff",
      borderRadius: "0.375rem",
      color: "#014C71",
      display: "flex",
      alignItems: "center",
      padding: "0.25rem 0.5rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#014C71",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#0056b3",
        color: "#ffffff",
      },
      borderRadius: "0.375rem",
      padding: "0 0.25rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "0.875rem",
    }),
  };

  return (
    <div>
      {title && (
        <label htmlFor={id} className=" font-medium text-gray-600">
          {title}
        </label>
      )}
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
        classNamePrefix="react-select"
        styles={customStyles}
      />
    </div>
  );
};

export default CustomSelect;
