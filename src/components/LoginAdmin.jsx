import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

function LoginAdmin({ onClose, onLogin }) {
  const loginModalRef = useRef();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleEnter = () => {
    onLogin(name, password);
  };
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed top-0 bottom left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 w-full h-full max-w-screen-md mx-auto">
      <div
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 mx-4 shadow-2xl bg-white rounded-2xl p-4 z-50"
        ref={loginModalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose color="#415564" size={40} />
        </button>
        <img
          src="/images/vectors/compressed/loginAdmin.webp"
          alt="Logo"
          className="w-[70%] h-[70%] m-auto max-h-[60vh] object-contain"
        />
        <input
          placeholder="Кой чука?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-[16px] p-3 comfortaa-regular -mt-2 my-2 w-full custom-shadow text-primary text-[16px] bg-white border-primary border-1 text-secondary"
        />
        <input
          placeholder="Каква е тайната парола?"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-[16px] p-3 comfortaa-regular w-full custom-shadow text-primary text-[16px] bg-white border-primary border-1 text-secondary"
        />
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={onClose}
            className="rounded-[16px] bg-secondary text-white comfortaa-regular custom-shadow p-3 w-full uppercase mt-6 text-[14px]"
          >
            Оп, обърках
          </button>
          <button
            onClick={handleEnter}
            className="rounded-[16px] bg-primary text-white comfortaa-regular custom-shadow p-3 w-full uppercase mt-6 text-[14px]"
          >
            Влез
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
