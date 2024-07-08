/** @format */

import React, { useState, useEffect } from "react";
import { fetchUsers } from "./api";
import Signup from "../../../components/common/modals/signup";
import Loader from "../../../components/common/loader/loader";
import { renderImage } from "../../../Utils/helpers";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await fetchUsers();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCLick = (data) => {
    setUserData(data);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => handleCLick("")}
        className="bg-[#014C71] text-white px-4 py-2 mb-4 rounded-sm"
      >
        Create New User
      </button>

      <div className="table-responsive">
        <table className="table whitespace-nowrap min-w-full">
          <thead className="bg-[#F3F6F8]">
            <tr className="border-b border-defaultborder">
              <th scope="col" className="text-start">
                Profile
              </th>
              <th scope="col" className="text-start">
                Username
              </th>
              <th scope="col" className="text-start">
                Email
              </th>
              <th scope="col" className="text-start">
                Data groups
              </th>
              <th scope="col" className="text-start">
                Role
              </th>
            </tr>
          </thead>
          {tableData.length > 0 ? (
            <tbody>
              {tableData.map((item) => (
                <tr
                  key={item?.id}
                  className="border-b border-defaultborder hover:bg-slate-50"
                >
                  <td
                    className="text-start h-10 w-10 hover:cursor-pointer"
                    onClick={() => handleCLick(item)}
                  >
                    {renderImage(item?.user_profile?.profile_picture)}
                  </td>
                  <td
                    className="text-start hover:underline hover:underline-offset-4 hover:cursor-pointer"
                    onClick={() => handleCLick(item)}
                  >
                    {item?.username}
                  </td>
                  <td className="text-start">{item?.email}</td>
                  <td className="text-start">
                    {item?.user_profile?.data_groups?.map((group) => (
                      <span
                        key={group.name}
                        className="inline-block mr-2 bg-[#014C71] text-white font-extralight p-1 rounded-sm"
                      >
                        {group.name}
                      </span>
                    ))}
                  </td>
                  <td className="text-start">
                    <div className="text-[0.75rem] py-1 px-2 bg-transparent border border-gray-300 rounded-md w-fit">
                      {item?.user_profile?.role?.name}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="text-center mt-4">No users found yet</div>
          )}
        </table>
      </div>

      <Signup
        showModal={showModal}
        setShowModal={setShowModal}
        onUserCreated={fetchData}
        userData={userData}
      />
    </div>
  );
};


export default Users;
