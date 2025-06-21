import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import UploadCard from "../components/UploadCard";
import CommentsBox from "../components/CommentsBox";

// MainScreen
function MainScreen({ onOpenUpload, refreshTrigger }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const username = localStorage.getItem("guestName");
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Load isAdmin state on client side
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const fetchImages = async (reset = false) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://instawedding-be.onrender.com/api/images?page=${
          reset ? 1 : page
        }&perPage=8`
      );
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      const newImages = response.data;

      // ✨ Filter out hidden images for non-admins
      const visibleImages = isAdmin
        ? newImages
        : newImages.filter((img) => !img.hidden);

      if (reset) {
        setImages(visibleImages);
        setPage(2);
      } else {
        setImages((prev) => [...prev, ...visibleImages]);
        setPage((prev) => prev + 1);
      }

      if (newImages.length < 8) setHasMore(false);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(true);
  }, [refreshTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchImages(true);
    }, 180000); // every 3 min
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        fetchImages(true);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && !loading && hasMore) {
        fetchImages();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div className="py-6 max-w-lg bg-white relative pb-[80px] mx-auto">
      <p
        onClick={() => setShowDropdown((prev) => !prev)}
        className="comfortaa-regular text-[14px] text-right px-2 py-1 mx-2 text-primary rounded-full inline-block bg-secondary float-right"
      >
        <FaRegUser color="#eebb7a" className="inline mb-1 mr-1" size={12} />
        {username}
      </p>
      {showDropdown && (
        <div className="absolute right-2 top-[56px] mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-50 flex items-center justify-center cursor-pointer">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-[#e74c3c] hover:bg-gray-100"
            onClick={() => {
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("guestName");
              window.location.reload();
            }}
          >
            Излез
          </button>
        </div>
      )}
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
      </div>

      {images.map((image, index) => (
        <UploadCard
          key={image._id}
          image={image}
          index={index}
          onOpenComments={(img) => {
            setSelectedImage(img);
            setShowModal(true);
          }}
        />
      ))}

      {loading && (
        <div className="text-center text-sm text-primary py-4">
          Зареждане...
        </div>
      )}

      {showModal && selectedImage && (
        <CommentsBox
          image={selectedImage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MainScreen;
