import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

function LoginError({ onClose, onRetry }) {
  const loginErrorRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginErrorRef.current &&
        !loginErrorRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed top-0 bottom left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 w-full h-full">
      <div
        className="fixed top-1/2 left-0 right-0 -translate-y-1/2 mx-4 shadow-2xl bg-white rounded-2xl p-4 z-50"
        ref={loginErrorRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose color="#415564" size={40} />
        </button>
        <img
          src="./../src/assets/images/vectors/loginerror.png"
          alt="Logo"
          className="w-[70%] h-[70%] m-auto -mt-12"
        />
        <h1 className="poiretOne text-secondary text-[32px] text-center -mt-12">
          Опа, кой сгреши паролата?
        </h1>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={onClose}
            className="rounded-[16px] bg-secondary text-white comfortaa-regular custom-shadow p-3 w-full uppercase mt-6 text-[14px]"
          >
            Излез
          </button>
          <button
            onClick={onRetry}
            className="rounded-[16px] bg-primary text-white comfortaa-regular custom-shadow p-3 w-full uppercase mt-6 text-[14px]"
          >
            Опитай пак
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginError;
