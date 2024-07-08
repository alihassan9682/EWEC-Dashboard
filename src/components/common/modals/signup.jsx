/** @format */

import React, { useState, useEffect } from "react";
import { fetchDataGroups, signupUser, updateUser, deleteUser } from "./api";
import Loader from "../loader/loader";
import toast from "react-hot-toast";
import { renderImage } from "../../../Utils/helpers";
import CustomSelect from "../inputs/customSelect";

const Signup = ({ showModal, setShowModal, onUserCreated, userData }) => {
  const [loading, setLoading] = useState(false);
  const [passwordshow, setPasswordshow] = useState(false);

  const initialFormData = {
    username: "",
    email: "",
    password: "",
    data_group: [],
    role: "",
    profilePicture: null,
    profile_picture: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [dataGroups, setDataGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataGroups();
        setDataGroups(data);
      } catch (error) {
        console.error("Error fetching data groups:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setFormData({
        username: userData?.username || "",
        email: userData?.email || "",
        password: "",
        data_group:
          userData?.user_profile?.data_groups?.map((group) => ({
            value: group.name,
            label: group.name,
          })) || [],
        role: userData?.user_profile?.role
          ? {
              value: userData?.user_profile?.role?.name,
              label: userData?.user_profile?.role?.name,
            }
          : {},
        profilePicture: userData?.user_profile?.profile_picture || "",
        profile_picture: userData?.user_profile?.profile_picture || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "data_group") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        data_group: selectedOptions,
      });
    } else if (
      name === "profilePicture" &&
      e.target.files &&
      e.target.files[0]
    ) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: file,
          profile_picture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    setFormData({
      ...formData,
      [name]: selectedOptions,
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profilePicture: file,
        profile_picture: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["username", "email", "data_group", "role"];
    if (!userData) {
      requiredFields.push("password");
    }

    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error("Please fill in all required fields.");
        return;
      }
    }

    try {
      setLoading(true);
      let base64Image = null;

      if (formData.profilePicture instanceof File) {
        base64Image = await convertToBase64(formData.profilePicture);
      } else {
        base64Image = formData.profilePicture;
      }

      const requestData = {
        ...formData,
        role: formData?.role?.value ? formData?.role?.value : "" ,
        data_group: formData.data_group.map((group) => group.value),
        profilePicture: base64Image,
      };

      if (userData) {
        const requestData = {
          username: formData.username,
          email: formData.email,
          password: formData.password || undefined,
          user_profile: {
            role: { name: formData?.role?.value ? formData?.role?.value : "" },
            data_group: formData.data_group.map((group) => group.value),
            profile_picture: base64Image,
          },
        };
        await updateUser(userData?.id, requestData);
        toast.success("User updated successfully!");
      } else {
        await signupUser(requestData);
        toast.success("User created successfully!");
      }

      setFormData(initialFormData);
      setShowModal(false);
      onUserCreated();
    } catch (error) {
      let combinedMessage = "";

      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
          combinedMessage += `${key}: ${error.response.data[key].join("\n")}\n`;
        });
      } else {
        combinedMessage = error.message;
      }

      toast.error(combinedMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userData.id);
      toast.success("User deleted successfully!");
      setShowModal(false);
      onUserCreated();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  if (!showModal) return null;
  if (loading) return <Loader />;

  const dataGroupOptions = dataGroups.map((group) => ({
    value: group.name,
    label: group.name,
  }));

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Inspector", label: "Inspector" },
    { value: "Manager", label: "Manager" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#6b7280",
      "&:hover": { borderColor: "#4b5563" },
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-fit max-w-md md:max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mt-8 ml-2 md:mb-6 flex flex-col items-center justify-end">
              <div
                className="relative w-24 h-24 md:w-40 md:h-40 flex items-center justify-center border-2 border-dashed border-[#014C71] hover:cursor-pointer rounded-full"
                onClick={() =>
                  document.getElementById("inputProfilePicture").click()
                }
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {formData.profile_picture ? (
                  <div className="transform md:scale-150 scale-90">
                    {renderImage(formData.profile_picture, 24, 24)}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs md:text-sm p-2 md:p-5 text-center">
                    Click to upload or drag and drop
                  </span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs md:text-sm p-2 md:p-5 text-center">
                    Click to upload or drag and drop
                  </span>
                </div>
              </div>
              <label
                htmlFor="inputProfilePicture"
                className="block text-sm font-medium text-gray-700 mb-2 mt-2"
              >
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                id="inputProfilePicture"
                name="profilePicture"
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <div className="mt-10 md:!ml-16 !ml-8 !mb-8 flex-1 text-gray-700 text-sm md:text-base">
              <div className="text-3xl font-semibold">
                {userData ? "Update User" : "New User"}
              </div>
              <ul className="list-disc pl-4 text-sm">
                <li>
                  Profile picture is optional, but recommended for better user
                  recognition.
                </li>
                <li>Username, email, data group, and role are required.</li>
                <li>Password is required only for new users.</li>
              </ul>
            </div>
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="mb-4">
              <input
                type="text"
                id="inputUsername"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-ring-slate-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="inputEmail"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-ring-slate-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <CustomSelect
                id="inputDataGroup"
                name="data_group"
                value={formData.data_group}
                onChange={handleSelectChange}
                options={dataGroupOptions}
                isMulti
                classNamePrefix="react-select"
                styles={customStyles}
                title={"Select Data Groups"}
              />
            </div>
            <div className="mb-4">
              <CustomSelect
                id="inputRole"
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                options={roleOptions}
                classNamePrefix="react-select"
                styles={customStyles}
                title={"Select Role"}
              />
            </div>

            {!userData && (
              <div className="input-group col-span-2">
                <input
                  type={passwordshow ? "text" : "password"}
                  className="form-control form-control-lg !rounded-s-md border border-gray-500 w-full"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setPasswordshow(!passwordshow)}
                  aria-label="button"
                  className="ti-btn bg-slate-100 !rounded-s-none !mb-0"
                  type="button"
                  id="button-addon2"
                >
                  <i
                    className={`${
                      passwordshow ? "ri-eye-line" : "ri-eye-off-line"
                    } align-middle`}
                  ></i>
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="mr-4 px-4 py-2 bg-[#014C71] hover:bg-[#27576e] text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {userData ? "Update" : "Create"}
            </button>
            {userData ? (
              <button
                type="button"
                onClick={handleDelete}
                className="mr-4 px-4 py-2 bg-[#e75b42] hover:bg-[#bb5644] text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
