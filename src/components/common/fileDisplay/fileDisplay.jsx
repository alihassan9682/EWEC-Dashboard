/** @format */

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineFileUnknown } from "react-icons/ai";

Modal.setAppElement("#root");

const Base64FileDisplayModal = ({ base64String, isOpen, setIsOpen }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (
      base64String &&
      base64String.startsWith("data:application/pdf;base64,")
    ) {
      const bytes = atob(base64String.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(bytes.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < bytes.length; i++) {
        uint8Array[i] = bytes.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
  }, [base64String]);

  const getContentType = (base64) => {
    const match = base64.match(/^data:(.*);base64,/);
    return match ? match[1] : "application/octet-stream";
  };

  const contentType = base64String ? getContentType(base64String) : "";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="File Display Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="max-w-screen-lg w-full bg-white rounded-lg shadow-xl mt-10 mx-4 sm:mx-auto sm:max-w-3xl">
        <div className="p-4 sm:p-6">
          {base64String ? (
            contentType.startsWith("image/") ? (
              <img
                src={base64String}
                alt="Base64 content"
                className="w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg"
              />
            ) : contentType === "application/pdf" && pdfUrl ? (
              <div className="w-full h-[60vh] sm:h-[70vh] border rounded-lg overflow-auto">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-none rounded-lg"
                  title="PDF content"
                />
              </div>
            ) : contentType.startsWith("text/") ? (
              <iframe
                src={base64String}
                title="Text content"
                className="w-full h-[60vh] sm:h-[70vh] border rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-[60vh] sm:h-[70vh]">
                <AiOutlineFileUnknown size={64} className="text-gray-400" />
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-[60vh] sm:h-[70vh]">
              <AiOutlineFileUnknown size={150} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex justify-end p-4 sm:p-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Base64FileDisplayModal;
