/** @format */

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../../components/common/loader/loader";

const FileToBase64Converter = ({ onFileConverted, filename }) => {
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState(filename);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update fileName state when filename prop changes
    setFileName(filename);
  }, [filename]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64(base64String);
        onFileConverted(base64String, file.name);
        toast.success("File converted to Base64 successfully!");
        setLoading(false);
      };
      reader.onerror = () => {
        toast.error("Error reading file");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex flex-col items-center mt-4">
      {loading && <Loader />}
      <div
        className={`w-96 h-40 border-2 border-dashed border-gray-400 hover:border-[#014C71] flex flex-col justify-center items-center cursor-pointer relative ${
          loading ? "opacity-25" : ""
        }`}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer hover:text-gray-900"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="text-gray-400 mt-2">Click to upload or drag and drop</p>
        <p className="text-gray-400 text-sm">(PDF, SVG, PNG, JPG or GIF)</p>
      </div>
      {fileName && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100 w-full text-center">
          {fileName}
        </div>
      )}
    </div>
  );
};

export default FileToBase64Converter;
