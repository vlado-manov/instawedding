import React from "react";
import "./../App.css";
import imageBg from "./../assets/images/loaderBackground.jpg";
import { FaRegCircleUser } from "react-icons/fa6";

function Welcome({ onUserIconClick, progress = 90 }) {
  //   const [name, setName] = useState("");
  //   const [loading, setLoading] = useState(false);

  //   const handleEnter = () => {
  //     if (!name.trim()) return;
  //     // localStorage.setItem("username", name);
  //     setLoading(true);
  //   };
  return (
    <div>
      <img
        src={imageBg}
        alt="Background"
        className="object-cover absolute inset-0 h-full w-full object-right"
      />
      <button
        className="absolute top-4 right-4 cursor-pointer z-40"
        onClick={onUserIconClick}
      >
        <FaRegCircleUser color="white" size={24} />
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-3xl">
        <div className="m-auto bg-[rgba(65,85,100,0.5)] rounded-[50px] p-10 mt-4 md:shadow-2xl border-primary border-6">
          <img
            src="./../src/assets/images/applogo.png"
            alt="Logo"
            className={`w-[100%] h-[100%] m-auto`}
          />
          <img
            src="./../src/assets/images/4.png"
            className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] m-auto mt-10 animate-bounce"
          />
          <h2 className="text-center mt-2 lobster text-primary text-[32px] md:text-[48px]">
            Очаквайте скоро...
          </h2>
          <div className="border-primary border-3 rounded-2xl p-1 mt-1 mb-6">
            <div
              className="bg-primary h-[16px] rounded-2xl transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>{" "}
          </div>

          {/* <div className="mt-6">
            <input
              placeholder="Моето име..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-[16px] border-3 border-primary p-5 comfortaa-regular mt-6 text-center w-full custom-shadow text-white text-[20px] bg-[rgba(0,0,0,0.25)]"
            />
            <button
              onClick={handleEnter}
              className="rounded-[16px] bg-primary text-white comfortaa-regular custom-shadow p-5 w-full uppercase mt-4 text-[20px]"
            >
              Влез
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
