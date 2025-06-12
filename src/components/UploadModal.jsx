import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

function UploadModal({ onClose, onUploadComplete }) {
  const modalRef = useRef();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showUploadSuccess, setUploadSuccess] = useState(false); // track if upload is successful

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const startUpload = () => {
    if (uploading) return;

    setShowProgress(true);
    setUploading(true);
    setProgress(0);

    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += 5;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadSuccess(true); // Set success after upload completion
          onUploadComplete(); // notify parent only
        }, 300);
      }
    }, 150); // ~3 sec
  };

  const handleRetryUpload = () => {
    setUploadSuccess(false); // Reset to initial upload state
    setShowProgress(false);
    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="fixed top-0 bottom left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 w-full h-full">
      <div
        className="fixed top-1/2 left-0 right-0 -translate-y-1/2 mx-4 shadow-2xl bg-white rounded-2xl p-4 z-50"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose color="#415564" size={40} />
        </button>

        {/* Initial Upload Modal */}
        {!showUploadSuccess && (
          <div className="upload-modal-content">
            <img
              src="./../src/assets/images/vectors/upload2.png"
              alt="Logo"
              className="w-[70%] h-[70%] m-auto"
            />
            <h1 className="text-secondary text-center text-[40px] poiretOne -mt-16">
              Снима ли?
            </h1>
            <p className="text-secondary text-center comfortaa-bold text-[14px] my-2">
              Можеш да качиш до 8 снимки наведнъж. Повече снимки = малко повече
              време за качване, така че както и с пиенето - прави го отговорно!
            </p>

            {showProgress && (
              <div className="border-primary border-3 rounded-2xl p-1 mt-1 mb-6">
                <div
                  className="bg-primary h-[16px] rounded-2xl transition-all duration-200 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={onClose}
                className="rounded-[16px] w-full bg-secondary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-4 text-[14px]"
              >
                По-късно
              </button>
              <button
                onClick={startUpload}
                className="rounded-[16px] w-full bg-primary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-4 text-[14px]"
              >
                Избери снимки
              </button>
            </div>
          </div>
        )}

        {/* Upload Success Modal */}
        {showUploadSuccess && (
          <div className="upload-success-modal-content">
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
                onClick={onClose}
                className="rounded-[16px] w-full bg-secondary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-6 text-[14px]"
              >
                Излез
              </button>
              <button
                onClick={handleRetryUpload}
                className="rounded-[16px] w-full bg-primary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-6 text-[14px]"
              >
                Качи още
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadModal;
