/** @format */

import React, { useState, useEffect } from "react";
import { fetchEntities } from "../../../Utils/utils_helpers";
import Modal from "./modal";
import Loader from "../../../components/common/loader/loader";
import Base64FileDisplayModal from "../../../components/common/fileDisplay/fileDisplay";
import { FaFileAlt } from "react-icons/fa";

const Datagroups = () => {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [base64String, setBase64String] = useState("");
  const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await fetchEntities("/api/datagroups/");
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttachment = (attachment) => {
    setIsModalOpen(true);
    setBase64String(attachment);
  };

  const handleCLick = (data) => {
    setGroup(data);
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
        className="bg-[#014C71] text-white px-4 py-2 mb-4 rounded-sm "
      >
        Create New Data Group
      </button>

      <div className="table-responsive">
        <table className="table whitespace-nowrap min-w-full">
          <thead className="bg-[#F3F6F8]">
            <tr className="border-b border-defaultborder">
              <th scope="col" className="text-start">
                Id
              </th>
              <th scope="col" className="text-start">
                Group Name
              </th>
              <th scope="col" className="text-start">
                Attachment
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No data groups available yet.
                </td>
              </tr>
            ) : (
              tableData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-defaultborder hover:bg-slate-50 hover:cursor-pointer"
                >
                  <td className="text-start">{item?.id}</td>
                  <td
                    className="text-start hover:underline hover:underline-offset-4"
                    onClick={() => handleCLick(item)}
                  >
                    {item?.name}
                  </td>
                  <td
                    className={`text-start ${
                      item?.attachment
                        ? "hover:underline hover:underline-offset-4 text-sky-800 cursor-pointer"
                        : "text-slate-500 line-through"
                    }`}
                    onClick={() => handleAttachment(item?.attachment)}
                  >
                    <FaFileAlt className="inline-block mr-1 w-6 h-6" />
                    {item?.attachment_name
                      ? item?.attachment_name
                      : "No preview Available"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Base64FileDisplayModal
        base64String={base64String}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onGroupCreated={fetchData}
        groupData={group}
      />
    </div>
  );
};

export default Datagroups;
