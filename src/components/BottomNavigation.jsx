import React from "react";
import { FaHome } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { BsCalendarHeartFill } from "react-icons/bs";

function BottomNavigation({ onOpenUpload, setScreen }) {
  return (
    <div className="fixed bottom-1 left-3 right-3 h-[72px] rounded-xl shadow-2xl bg-primary w-auto flex items-center justify-between px-12 z-[45]">
      <button onClick={() => setScreen("main")}>
        <FaHome size={38} className="text-white" />
      </button>
      <button
        onClick={onOpenUpload}
        className="-mt-[32px] border-primary bg-primary rounded-full border-[12px] text-white"
      >
        <FaCirclePlus size={64} />
      </button>
      <button onClick={() => setScreen("schedule")}>
        <BsCalendarHeartFill size={34} className="text-white" />
      </button>
    </div>
  );
}

export default BottomNavigation;
