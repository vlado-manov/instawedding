import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

function UploadModal({ onClose, onUploadComplete, refreshImages }) {
  const modalRef = useRef();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showUploadSuccess, setUploadSuccess] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // State for selected images
  const [visualProgress, setVisualProgress] = useState(0);
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

  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setVisualProgress((prev) => {
          const next = prev + 1;
          if (next >= progress || next >= 99) {
            return prev; // wait for real completion
          }
          return next;
        });
      }, 100); // slower visual update

      return () => clearInterval(interval);
    }
  }, [uploading, progress]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 8) {
      alert("You can only upload up to 8 images.");
      return;
    }

    setSelectedImages(files);
    setShowProgress(true);
    setUploading(true);
    setProgress(0);
    setVisualProgress(0); // Start visual progress from 0

    const uploader = localStorage.getItem("guestName");
    const formData = new FormData();
    formData.append("uploader", uploader);
    files.forEach((image) => {
      formData.append("images", image);
    });

    axios
      .post(
        "https://instawedding-be.onrender.com/api/images/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent); // real progress
          },
        }
      )
      .then((response) => {
        // Ensure both real and visual progress hit 100
        setProgress(100);
        setVisualProgress(100);

        // Wait a bit so 100% progress is seen, then show success modal
        setTimeout(() => {
          setUploadSuccess(true);
          setShowProgress(false);
          setSelectedImages([]);
          setUploading(false);

          onUploadComplete?.();
          refreshImages?.();
        }, 500); // Delay so user sees progress bar hit 100%
      })
      .catch((error) => {
        console.error("UPLOAD ERROR:", error);
        setUploading(false);
        setShowProgress(false);
        alert("Upload failed, please try again.");
      });
  };

  const handleRetryUpload = () => {
    setUploadSuccess(false);
    setShowProgress(false);
    setUploading(false);
    setProgress(0);
    setSelectedImages([]); // Reset selected images
  };

  return (
    <div className="fixed top-0 bottom left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 w-full h-full max-w-screen-md mx-auto">
      <div
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 mx-4 shadow-2xl bg-white rounded-2xl p-4 z-50"
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
              src="/images/vectors/compressed/upload2.webp"
              alt="Logo"
              className="w-[70%] h-[70%] m-auto object-contain max-h-[60vh]"
            />
            <h1 className="text-secondary text-center text-[40px] poiretOne -mt-16">
              Снима ли?
            </h1>
            <p className="text-secondary text-center comfortaa-bold text-[14px] my-2">
              Качи до 8 снимки наведнъж. Повече снимки = малко повече време за
              качване, така че както и с пиенето - прави го отговорно!
            </p>

            {/* Show progress bar while uploading */}
            {showProgress && (
              <div className="border-primary border-3 rounded-2xl p-1 mt-1 mb-6">
                <div
                  className="bg-primary h-[16px] rounded-2xl transition-all duration-200 ease-in-out"
                  style={{ width: `${visualProgress}%` }}
                ></div>
              </div>
            )}

            <div className="flex gap-2 justify-center items-center">
              {/* <button
                onClick={onClose}
                className="rounded-[16px] w-full bg-secondary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-4 text-[14px]"
              >
                По-късно
              </button> */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload-input"
              />
              <label
                htmlFor="image-upload-input"
                className="cursor-pointer rounded-[16px] w-full text-center bg-primary text-white comfortaa-bold custom-shadow p-3 w-full uppercase my-4 text-[14px]"
              >
                Избери снимки
              </label>
            </div>
          </div>
        )}

        {/* Upload Success Modal */}
        {showUploadSuccess && (
          <div className="upload-success-modal-content">
            <img
              src="/images/vectors/compressed/uploadSuccess.webp"
              alt="Logo"
              className="w-[70%] h-[70%] m-auto object-contain max-h-[60vh]"
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
