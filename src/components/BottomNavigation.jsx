import React from "react";
import { FaHome } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { BsCalendarHeartFill } from "react-icons/bs";

function BottomNavigation({ onOpenUpload, setScreen }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] shadow-2xl bg-primary w-auto flex items-center justify-between px-12 z-[45]">
      <button onClick={() => setScreen("main")}>
        <FaHome size={28} className="text-white" />
      </button>
      <button
        onClick={onOpenUpload}
        className="-mt-[32px] border-primary bg-primary rounded-full border-[8px] text-white"
      >
        <FaCirclePlus size={44} />
      </button>
      <button onClick={() => setScreen("schedule")}>
        <BsCalendarHeartFill size={24} className="text-white" />
      </button>
    </div>
  );
}

export default BottomNavigation;
