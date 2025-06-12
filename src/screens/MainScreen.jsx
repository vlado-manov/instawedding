import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  //   faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { RiSendPlane2Line } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Images
import imagePortrait from "./../assets/images/imagePortrait.jpg";
import imagePortraitA from "./../assets/images/imagePortrait2.jpg";
import imagePortraitB from "./../assets/images/imagePortrait3.jpg";
import imageLandscape from "./../assets/images/imageLandscape.jpg";
import imageLandscapeA from "./../assets/images/imageLandscape2.jpg";
import { IoClose } from "react-icons/io5";
import UploadModal from "../components/UploadModal";

// Comments Modal Component
const CommentsModal = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-30 z-50 flex items-end justify-center"
    onClick={onClose}
  >
    <div className="bg-secondary w-full max-h-[50%] rounded-t-2xl p-6 animate-slide-up shadow-[1px,1px,5px,1px,rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl poiretOne text-white">Коментари</h3>
        <button onClick={onClose} className="text-white text-sm">
          <IoClose color="white" size={24} />
        </button>
      </div>
      <div className="text-white">
        <div className="flex items-start justify-between gap-2 pb-2 my-2">
          <div className="rounded-full bg-primary flex items-center justify-center text-secondary p-2 font-bold lobster w-[30px] h-[30px]">
            П
          </div>
          <div className="text-sm text-white comfortaa-regular border-primary border-b-1 pb-2">
            <span className="font-sans font-bold text-white mr-1">
              ПРЕСИЯН{" "}
            </span>
            Много сте грозни, постарайте се повече следващия път
          </div>
        </div>
        <div className="flex items-start justify-between gap-2 pb-2 my-2">
          <div className="rounded-full bg-primary flex items-center justify-center text-secondary p-2 font-bold lobster w-[30px] h-[30px]">
            П
          </div>
          <div className="text-sm text-white comfortaa-regular border-primary border-b-1 pb-2">
            <span className="font-sans font-bold text-white mr-1">
              ПРЕСИЯН{" "}
            </span>
            Много сте грозни, постарайте се повече следващия път
          </div>
        </div>
        <div className="flex items-start justify-between gap-2 pb-2 my-2">
          <div className="rounded-full bg-primary flex items-center justify-center text-secondary p-2 font-bold lobster w-[30px] h-[30px]">
            П
          </div>
          <div className="text-sm text-white comfortaa-regular border-primary border-b-1 pb-2">
            <span className="font-sans font-bold text-white mr-1">
              ПРЕСИЯН{" "}
            </span>
            Много сте грозни, постарайте се повече следващия път
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Single Comment Card
const CommentCard = ({
  imageSrc,
  imageSrcs,
  isPortrait,
  index,
  onOpenComments,
}) => {
  const isOdd = index % 2 === 0;
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const images = imageSrcs || [imageSrc];

  const handleDoubleClick = () => {
    setLiked(true);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <div
      className={`${
        isOdd ? "bg-white" : "bg-[#fff0e3] shadow-md"
      } p-6 relative`}
    >
      <div className="overflow-hidden rounded-xl mb-0 relative">
        <Swiper
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Pagination]}
          className="rounded-xl overflow-hidden"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative" onDoubleClick={handleDoubleClick}>
                <img
                  src={src}
                  alt={`Slide ${idx}`}
                  className={`w-full ${
                    isPortrait ? "h-auto" : "aspect-video"
                  } object-cover`}
                />
                {showHeart && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={solidHeart}
                      className="text-[#ff0078] text-6xl opacity-80 animate-ping"
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Image */}
      {/* <div
        className="overflow-hidden rounded-xl mb-0 relative"
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={imageSrc}
          alt="Wedding"
          className={`w-full ${
            isPortrait ? "h-auto" : "aspect-video"
          } object-cover`}
        />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FontAwesomeIcon
              icon={solidHeart}
              className="text-[#ff0078] text-6xl opacity-80 animate-ping"
            />
          </div>
        )}
      </div> */}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 p-2">
          <div
            className={`w-4 h-4 rounded-full ${
              isOdd ? "bg-[#415564]" : "bg-[#eebb7a]"
            }`}
          ></div>
          <span className="font-comfortaa text-[#415564]">
            Естел{" "}
            <span className="text-xs text-[#415564]">(преди 2 минути)</span>
          </span>
        </div>
        {/* <span className="text-xs text-[#415564]">преди 2 минути</span> */}
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2 text-secondary"
        >
          42{" "}
          <FontAwesomeIcon
            icon={solidHeart}
            className={`text-2xl transition-colors ${
              liked ? "text-[#ff0078]" : "text-[#eebb7a]"
            }`}
          />
        </button>
      </div>

      {/* Interaction Bar */}
      {/* <div className="flex items-center space-x-6 mb-2 text-[#415564] text-[16px] px-2">
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2"
        >
          42{" "}
          <FontAwesomeIcon
            icon={solidHeart}
            className={`text-2xl transition-colors ${
              liked ? "text-[#ff0078]" : "text-[#415564]"
            }`}
          />
        </button>
        <button onClick={onOpenComments} className="flex items-center gap-2">
          3 <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
        </button>
      </div> */}

      {/* Comment Input */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Напиши коментар..."
          className="w-full border-b border-[#415564] bg-transparent outline-none py-1 mb-2 text-sm text-[#415564] text-[16px]"
        />
        <RiSendPlane2Line color="#415564" size={24} />
      </div>

      {/* User Comment */}
      <div className="text-sm text-[#415564] comfortaa-regular">
        <span className="font-sans font-bold text-[#415564]">ПРЕСИЯН </span>
        Много сте грозни, постарайте се повече следващия път
      </div>

      {/* See All */}
      <div
        onClick={onOpenComments}
        className="mt-4 text-sm text-center underline text-[#415564] cursor-pointer"
      >
        Виж всички
      </div>
    </div>
  );
};

// Main Component
function MainScreen({ onOpenUpload }) {
  const [showModal, setShowModal] = useState(false);

  const openComments = () => setShowModal(true);
  const closeComments = () => setShowModal(false);

  return (
    <div className="py-6 max-w-lg mx-auto bg-white relative pb-[80px]">
      {/* <UploadModal /> */}
      <div className="px-4">
        <img
          src="/images/applogo-primary.png"
          alt="Logo"
          className="w-full h-auto m-auto pl-2"
        />
        <button
          className="rounded-[16px] bg-transparent border-primary border-2 text-primary comfortaa-medium custom-shadow p-5 w-full uppercase my-6 text-[20px]"
          onClick={onOpenUpload}
        >
          Качи снимки
        </button>
        <div className="flex items-center justify-center gap-2 my-2">
          <button className="bg-secondary p-2 rounded-full text-white font-comfortaa w-[32px] h-[32px] flex items-center justify-center">
            1
          </button>
          <button className="bg-primary p-2 rounded-full text-white font-comfortaa w-[32px] h-[32px] flex items-center justify-center">
            {" "}
            2
          </button>
          <button className="bg-secondary p-2 rounded-full text-white font-comfortaa w-[32px] h-[32px] flex items-center justify-center">
            {" "}
            3
          </button>
          <button className="bg-secondary p-2 rounded-full text-white font-comfortaa w-[32px] h-[32px] flex items-center justify-center">
            {" "}
            ...
          </button>
          <button className="bg-secondary p-2 rounded-full text-white font-comfortaa w-[32px] h-[32px] flex items-center justify-center">
            {" "}
            9
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button className="text-secondary cursor-pointer m-auto">
            Презареди
          </button>
        </div>
      </div>
      <CommentCard
        imageSrc={imagePortrait}
        isPortrait={true}
        index={0}
        onOpenComments={openComments}
      />
      <CommentCard
        imageSrc={imageLandscape}
        isPortrait={false}
        index={1}
        onOpenComments={openComments}
      />
      <CommentCard
        imageSrc={imageLandscapeA}
        isPortrait={false}
        index={2}
        onOpenComments={openComments}
      />
      <CommentCard
        imageSrcs={[imagePortraitA, imagePortraitB, imagePortrait]}
        isPortrait={true}
        index={3}
        onOpenComments={openComments}
      />
      <CommentCard
        imageSrcs={[
          imagePortraitB,
          imagePortraitA,
          imagePortraitB,
          imagePortrait,
        ]}
        isPortrait={true}
        index={4}
        onOpenComments={openComments}
      />

      {showModal && <CommentsModal onClose={closeComments} />}
    </div>
  );
}

export default MainScreen;
