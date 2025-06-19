import React from "react";
import { IoClose } from "react-icons/io5";

// Comments Modal Component
const CommentsBox = ({ onClose, image }) => (
  <div
    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-end justify-center max-w-screen-md mx-auto"
    onClick={onClose}
  >
    <div
      className="bg-secondary w-full max-h-[85vh] rounded-t-2xl p-6 animate-slide-up shadow-[1px,1px,5px,1px,rgba(0,0,0,0.5)] overflow-scroll"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl poiretOne text-white">Коментари</h3>
        <button onClick={onClose}>
          <IoClose color="white" size={24} />
        </button>
      </div>
      <div className="text-white overflow-y-auto max-h-[80vh]">
        {image.comments?.map((comment, idx) => (
          <div key={idx} className="flex items-start gap-2 pb-2 my-2">
            <div className="rounded-full bg-primary flex items-center justify-center text-secondary p-2 font-bold lobster w-[30px] h-[30px]">
              {comment.user?.[0]?.toUpperCase() || "?"}
            </div>
            <div
              className="text-sm text-white comfortaa-regular border-primary border-b-1 pb-2 w-full"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              <span className="font-sans font-bold mr-1">{comment.user}</span>
              {comment.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CommentsBox;
