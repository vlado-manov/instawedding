import React from "react";

function Shedule() {
  return (
    <div className="px-4 py-8 max-w-lg mx-auto bg-white relative mb-[72px]">
      <img
        src="./../src/assets/images/applogo-primary.png"
        alt="Logo"
        className="w-[75%] h-auto m-auto mb-8"
      />
      <div className="flex">
        <div className="flex flex-col justify-start items-start w-1/2 px-4">
          <div className="flex flex-col justify-center relative">
            <div className="h-[6px] bg-secondary w-[40px] absolute top-1/2 right-0 translate-x-1/2"></div>
            <img
              src="./../src/assets/images/vectors/ritual.png"
              alt="Logo"
              className="w-full h-auto m-auto pl-2"
            />
            <h3 className="comfortaa-semibold text-center text-secondary text-[16px] -mt-6">
              <span className="font-sans font-bold text-[18px]">16:30</span>
              <br />
              Изнесен ритуал
            </h3>
          </div>
          <div className="h-[64px] w-full"></div>
          <div className="flex flex-col justify-center relative">
            <div className="h-[6px] bg-secondary w-[40px] absolute top-1/2 right-0 translate-x-1/2"></div>
            <img
              src="./../src/assets/images/vectors/cocktail.png"
              alt="Logo"
              className="w-[65%] h-auto m-auto pl-2"
            />
            <h3 className="comfortaa-semibold text-center text-secondary text-[16px] -mt-3">
              <span className="font-sans font-bold text-[18px]">17:45</span>
              <br />
              Welcome drink
            </h3>
          </div>
          <div className="h-[64px] w-full"></div>
          <div className="flex flex-col justify-center relative">
            <div className="h-[6px] bg-secondary w-[40px] absolute top-1/2 right-0 translate-x-1/2"></div>
            <img
              src="./../src/assets/images/vectors/weddingcake.png"
              alt="Logo"
              className="w-[65%] h-auto m-auto pl-2"
            />
            <h3 className="comfortaa-semibold text-center text-secondary text-[16px] -mt-1">
              <span className="font-sans font-bold text-[18px]">23:00</span>
              <br />
              Торта
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-1/2 border-primary border-l-4 px-4">
          <div className="h-[100px] w-full"></div>
          <div className="flex flex-col justify-center relative">
            <div className="h-[6px] bg-secondary w-[40px] absolute top-1/2 left-0 -translate-x-1/2"></div>
            <img
              src="./../src/assets/images/vectors/camera.png"
              alt="Logo"
              className="w-[65%] h-auto m-auto pl-2"
            />
            <h3 className="comfortaa-semibold text-center text-secondary text-[16px] -mt-3">
              <span className="font-sans font-bold text-[18px]">17:00</span>
              <br />
              Поздравления и снимки с младеоженците
            </h3>
          </div>
          <div className="h-[56px] w-full"></div>
          <div className="flex flex-col justify-center relative">
            <div className="h-[6px] bg-secondary w-[40px] absolute top-1/2 left-0 -translate-x-1/2"></div>
            <img
              src="./../src/assets/images/vectors/dinner.png"
              alt="Logo"
              className="w-[65%] h-auto m-auto pl-2"
            />
            <h3 className="comfortaa-semibold text-center text-secondary text-[16px]">
              <span className="font-sans font-bold text-[18px]">19:30</span>
              <br />
              Официална вечеря
            </h3>
          </div>
          <div className="h-[56px] w-full"></div>
          <div className="flex flex-col justify-center relative">
            <img
              src="./../src/assets/images/vectors/party.png"
              alt="Logo"
              className="w-[65%] h-auto m-auto pl-2"
            />
            <div className="h-[6px] bg-secondary w-[40px] absolute top-1/2 left-0 -translate-x-1/2"></div>
            <h3 className="comfortaa-semibold text-center text-secondary text-[16px] -mt-3">
              <span className="font-sans font-bold text-[32px]">&infin;</span>
              <br />
              Парти
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shedule;
