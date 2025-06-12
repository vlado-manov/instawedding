import React from "react";
import { IoClose } from "react-icons/io5";

function UploadSuccess({ onClose, setUploadSuccess }) {
  return (
    <div className="fixed top-0 bottom left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 w-full h-full">
      <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 mx-4 shadow-2xl bg-white rounded-2xl p-4 z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose color="#415564" size={40} />
        </button>
        {/* Upload Success modal*/}
        {/* <div className="upload-success-modal-content">
          <img
            src="./../src/assets/images/vectors/uploadSuccess.png"
            alt="Logo"
            className="w-[70%] h-[70%] m-auto"
          />
          <h1 className="poiretOne text-secondary text-[32px] text-center -mt-2">
            Благодарим за снимките!
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={() => {
                setUploadSuccess(false);
              }}
              className="rounded-[16px] w-full bg-primary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-6 text-[14px]"
            >
              Качи още
            </button>
            <button
              onClick={onClose}
              className="rounded-[16px] w-full bg-secondary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-6 text-[14px]"
            >
              Излез
            </button>
          </div>
        </div>{" "} */}
        {/* Here is the end of the upload success modal*/}
      </div>
    </div>
  );
}

export default UploadSuccess;
