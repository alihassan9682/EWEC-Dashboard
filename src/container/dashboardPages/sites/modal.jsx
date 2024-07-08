/** @format */

import React, { useState, useEffect } from "react";
import {
  createEntity,
  deleteEntity,
  updateEntity,
  fetchEntities,
} from "../../../Utils/utils_helpers";
import Loader from "../../../components/common/loader/loader";
import toast from "react-hot-toast";
import FileToBase64Converter from "../../../components/common/inputs/inputFile";
import CustomSelect from "../../../components/common/inputs/customSelect";
import { useSelector } from "react-redux";

const Modal = ({ showModal, setShowModal, onSiteCreated, siteData }) => {
  const user = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    changed_by: user?.user_data?.id,
    company: "",
    attachment: "",
    attachment_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntities("/api/companies/");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchData();
  }, []);

  const companyOptions = companies.map((company) => ({
    value: company.name,
    label: company.name,
  }));

  useEffect(() => {
    if (siteData && Object.keys(siteData).length > 0) {
      setFormData({
        name: siteData?.name || "",
        description: siteData?.description || "",
        changed_by: user?.user_data?.id,
        company: siteData?.company?.name || "",
        attachment: siteData?.attachment || "",
        attachment_name: siteData?.attachment_name || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        changed_by: user?.user_data?.id,
        company: "",
        attachment: "",
        attachment_name: "",
      });
    }
  }, [siteData, user?.user_data?.id]);

  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData({
      ...formData,
      company: selectedValue,
    });
  };

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
    if (!formData.name || !formData.description || !formData.company) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (siteData && Object.keys(siteData).length > 0) {
        await updateEntity("/api/sites/", formData, siteData.id);
        toast.success("Site updated successfully!");
      } else {
        await createEntity("/api/sites/", formData);
        toast.success("Site created successfully!");
      }

      setFormData({
        name: "",
        description: "",
        changed_by: user?.user_data?.id,
        company: "",
        attachment: "",
        attachment_name: "",
      });
      onSiteCreated();
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
      await deleteEntity("/api/sites/", siteData.id);
      toast.success("Site deleted successfully!");
      onSiteCreated();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete site.");
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
                {siteData && Object.keys(siteData).length > 0
                  ? "Update Site"
                  : "New Site"}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="mb-4">
                  <input
                    type="text"
                    id="siteName"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="siteDescription"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <CustomSelect
                    id="inputCompany"
                    name="company"
                    value={companyOptions.find(
                      (option) => option.value === formData.company
                    )}
                    onChange={handleSelectChange}
                    options={companyOptions}
                    classNamePrefix="react-select"
                    isMulti={false}
                    title="Select Company"
                  />
                </div>
                <div className="mb-4">
                  <FileToBase64Converter
                    onFileConverted={handleFileConverted}
                    filename={formData?.attachment_name}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="mr-4 px-4 py-2 bg-[#014C71] hover:bg-[#27576e] text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {siteData && Object.keys(siteData).length > 0
                    ? "Update"
                    : "Create"}
                </button>
                {siteData && (
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
