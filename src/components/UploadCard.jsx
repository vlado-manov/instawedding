// Single Comment Card
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { RiSendPlane2Line } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GrHide } from "react-icons/gr";
import { formatTimeAgo } from "../utils/time";

const UploadCard = ({ image, index, onOpenComments }) => {
  const isOdd = index % 2 === 0;
  const guestId = localStorage.getItem("guestName");
  const [liked, setLiked] = useState(image.likedBy?.includes(guestId));
  const [likes, setLikes] = useState(image.likes || 0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(image.comments || []);
  const [showHeart, setShowHeart] = useState(false);

  const handleLikeToggle = async () => {
    try {
      const response = await axios.post(
        `https://instawedding-be.onrender.com/api/images/like/${image._id}`,
        { userId: guestId }
      );
      setLiked(response.data.liked);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post(
        `https://instawedding-be.onrender.com/api/images/comment/${image._id}`,
        {
          text: commentText,
          user: guestId,
        }
      );
      const newComment = { text: commentText, user: guestId };
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [isHidden, setIsHidden] = useState(false); // default false

  useEffect(() => {
    setIsHidden(image.hidden || false);
  }, [image.hidden]);

  const toggleHide = async () => {
    try {
      const response = await axios.post(
        `https://instawedding-be.onrender.com/api/admin/hide/${image._id}`
      );
      setIsHidden(response.data.hidden);
    } catch (err) {
      console.error("Failed to toggle hide:", err);
    }
  };

  return (
    <div
      className={`${
        isOdd ? "bg-white" : "bg-[#fff0e3] shadow-md"
      } p-6 relative`}
    >
      {isAdmin && (
        <GrHide
          onClick={toggleHide}
          className={`absolute top-4 right-4 z-50 p-2 rounded-full transition-all ${
            isHidden ? "bg-tertiary text-gray-500" : "bg-secondary text-white"
          }`}
          size={40}
        />
      )}

      <div className="overflow-hidden rounded-lg mb-0 relative">
        <Swiper
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Pagination]}
          className="overflow-hidden"
        >
          {image.imageUrls.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`relative w-full ${
                  image.isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"
                } bg-white overflow-hidden`}
              >
                {" "}
                <img
                  src={src}
                  alt={`Slide ${idx}`}
                  onDoubleClick={() => {
                    if (!liked) handleLikeToggle();
                    setShowHeart(true);
                    setTimeout(() => setShowHeart(false), 1000);
                  }}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                {showHeart && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 p-2">
          <div
            className={`w-4 h-4 rounded-full ${
              isOdd ? "bg-[#415564]" : "bg-[#eebb7a]"
            }`}
          ></div>
          <span className="font-comfortaa text-[#415564]">
            {image.uploader}
            <span className="text-xs text-[#415564]">
              {" "}
              ({formatTimeAgo(image.createdAt)})
            </span>
          </span>
        </div>
        <button
          onClick={handleLikeToggle}
          className="flex items-center gap-2 text-secondary"
        >
          {likes}
          <FontAwesomeIcon
            icon={solidHeart}
            className={`text-2xl transition-colors ${
              liked ? "text-[#ff0078]" : "text-[#eebb7a]"
            }`}
          />
        </button>
      </div>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Напиши коментар..."
          className="w-full border-b border-[#415564] bg-transparent outline-none py-1 mb-2 text-[16px] text-[#415564]"
        />
        <RiSendPlane2Line
          color="#415564"
          size={24}
          onClick={handleCommentSubmit}
          className="cursor-pointer"
        />
      </div>

      {comments.length > 0 && (
        <div
          className="text-sm text-[#415564] comfortaa-regular"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          <span className="font-sans font-bold">{comments.at(-1).user}</span>{" "}
          {comments.at(-1).text}
        </div>
      )}

      {comments.length > 1 && (
        <div
          onClick={() => onOpenComments({ ...image, comments })}
          className="mt-4 text-sm text-center underline text-[#415564] cursor-pointer"
        >
          Виж всички
        </div>
      )}
    </div>
  );
};
export default UploadCard;
