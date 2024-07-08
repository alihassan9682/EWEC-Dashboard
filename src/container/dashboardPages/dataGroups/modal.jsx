/** @format */

import React, { useState, useEffect } from "react";
import {
  createEntity,
  deleteEntity,
  updateEntity,
} from "../../../Utils/utils_helpers";
import Loader from "../../../components/common/loader/loader";
import toast from "react-hot-toast";
import FileToBase64Converter from "../../../components/common/inputs/inputFile";

const Modal = ({ showModal, setShowModal, onGroupCreated, groupData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    attachment: "",
    attachment_name: "",
  });

  useEffect(() => {
    if (groupData && Object.keys(groupData).length > 0) {
      setFormData({
        name: groupData?.name || "",
        attachment: groupData?.attachment || "",
        attachment_name: groupData?.attachment_name || "",
      });
    } else {
      setFormData({
        name: "",
        attachment: "",
        attachment_name: "",
      });
    }
  }, [groupData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileConverted = (base64String, fileName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      attachment: base64String,
      attachment_name: fileName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (groupData) {
        await updateEntity("/api/datagroups/", formData, groupData.id);
        toast.success("Data group updated successfully!");
      } else {
        await createEntity("/api/datagroups/",formData);
        toast.success("Data group created successfully!");
      }

      setFormData({
        name: "",
        attachment: "",
        attachment_name: "",
      });
      onGroupCreated();
      setShowModal(false);
    } catch (error) {
      const combinedMessage =
        error.response && error.response.data
          ? Object.entries(error.response.data)
              .map(([key, value]) => `${key}: ${value.join("\n")}`)
              .join("\n")
          : error.message;
      toast.error(combinedMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEntity("/api/datagroups/",groupData.id);
      toast.success("Data group deleted successfully!");
      onGroupCreated();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete Data group.");
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-md w-fit max-w-md md:max-w-3xl">
        {loading && <Loader />}
        {!loading && (
          <>
            <div className="mt-4 flex-1 text-gray-700 text-sm md:text-base">
              <div className="text-2xl font-semibold mb-4">
                {groupData ? "Update Data group" : "New Data group"}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="mb-4">
                  <input
                    type="text"
                    id="datagroupname"
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-ring-slate-500 sm:text-sm"
                  />
                  <FileToBase64Converter
                    onFileConverted={handleFileConverted} filename={formData?.attachment_name}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="mr-4 px-4 py-2 bg-[#014C71] hover:bg-[#27576e] text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {groupData ? "Update" : "Create"}
                </button>
                {groupData && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="mr-4 px-4 py-2 bg-[#e75b42] hover:bg-[#bb5644] text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
