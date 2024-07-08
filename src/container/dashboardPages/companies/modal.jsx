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

const Modal = ({ showModal, setShowModal, onCompanyCreated, companyData }) => {
  const user = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [dataGroups, setDataGroups] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    changed_by: user?.user_data?.id,
    group: "",
    attachment: "",
    attachment_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntities("/api/datagroups/");
        setDataGroups(data);
      } catch (error) {
        console.error("Error fetching data groups:", error);
      }
    };

    fetchData();
  }, []);

  const dataGroupOptions = dataGroups.map((group) => ({
    value: group.name,
    label: group.name,
  }));

  useEffect(() => {
    if (companyData && Object.keys(companyData).length > 0) {
      setFormData({
        name: companyData?.name || "",
        description: companyData?.description || "",
        changed_by: user?.user_data?.id,
        group: companyData?.group || "",
        attachment: companyData?.attachment || "",
        attachment_name: companyData?.attachment_name || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        changed_by: user?.user_data?.id,
        group: "",
        attachment: "",
        attachment_name: "",
      });
    }
  }, [companyData, user?.user_data?.id]);

  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData({
      ...formData,
      group: selectedValue,
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
    if (!formData.name || !formData.description || !formData.group) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (companyData) {
        await updateEntity("/api/companies/", formData, companyData.id);
        toast.success("Company updated successfully!");
      } else {
        await createEntity("/api/companies/", formData);
        toast.success("Company created successfully!");
      }

      setFormData({
        name: "",
        description: "",
        changed_by: user?.user_data?.id,
        group: "",
        attachment: "",
        attachment_name: "",
      });
      onCompanyCreated();
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
      await deleteEntity("/api/companies/", companyData.id);
      toast.success("Company deleted successfully!");
      onCompanyCreated();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete Company.");
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
                {companyData ? "Update Company" : "New Company"}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="mb-4">
                  <input
                    type="text"
                    id="datagroupname"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-ring-slate-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="datagroupdescription"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-ring-slate-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <CustomSelect
                    id="inputDataGroup"
                    name="group"
                    value={dataGroupOptions.find(
                      (option) => option.value === formData.group
                    )}
                    onChange={handleSelectChange}
                    options={dataGroupOptions}
                    classNamePrefix="react-select"
                    isMulti={false}
                    title={"Select Data Group"}
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
                  {companyData ? "Update" : "Create"}
                </button>
                {companyData && (
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
