import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaShareAlt, FaHeart as FaHeartSolid } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import InfoCard from "./InfoCard/InfoCard";
import RoomCategory from "./RoomCategory";
import wishlistService from "../../services/WhishlistServices";
import { showToast } from "../../utils/toastUtils";
import LoginPromptModal from "../modals/LoginRequiredModal";

const RoomInfo = ({ room }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const user = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    checkWishlist();
  }, [user]);

  const checkWishlist = async () => {
    if (user) {
      try {
        const wishlistItems = await wishlistService.getWishlist();
        const isInWishlist = wishlistItems.some(
          (item) => item.room.id === room.id
        );
        setInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    }
  };

  const addToWishlist = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    try {
      await wishlistService.addToWishlist(room.id);
      showToast('Room added to wishlist!', 'success');
      setInWishlist(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await wishlistService.removeFromWishlist(wishlistItemId);
      showToast("Room removed from wishlist!", 'success');
      setInWishlist(false);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (inWishlist) {
      const wishlistItem = await findWishlistItem();
      if (wishlistItem) {
        await removeFromWishlist(wishlistItem.id);
      }
    } else {
      await addToWishlist();
    }
  };

  const findWishlistItem = async () => {
    try {
      const wishlistItems = await wishlistService.getWishlist();
      return wishlistItems.find((item) => item.room.id === room.id);
    } catch (error) {
      console.error("Error finding wishlist item:", error);
      return null;
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: room.name,
          text: `Check out this room: ${room.name}`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.error("Web Share API not supported in this browser.");
    }
  };

  const generateEmbedUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
      const latitude = match[1];
      const longitude = match[2];
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyCxrS-z6954sFNX2BKJwTth7_vG-tmAQD0&q=${latitude},${longitude}&zoom=14`;
    }
    return url;
  };

  const googleMapsEmbedUrl = generateEmbedUrl(room.google_map_url);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl text-gray-800 mt-4 font-bold">{room.name}</h1>
          <p className="text-gray-600 mt-2 flex items-center font-medium">
            <FaMapMarkerAlt className="mr-2" />
            {`${room.location.country}, ${room.location.city}, ${room.location.name}`}
          </p>
        </div>
        <div>
          <div className="flex gap-3 text-gray-600 text-2xl mt-8">
            {inWishlist ? (
              <FaHeartSolid
                className="text-red-600 text-3xl cursor-pointer"
                onClick={handleWishlistToggle}
              />
            ) : (
              <LuHeart
                className="cursor-pointer text-3xl"
                onClick={handleWishlistToggle}
              />
            )}
            <FaShareAlt className="cursor-pointer mt-1" onClick={handleShareClick} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3">
          <RoomCategory category={room.category} />
          <InfoCard
            icon="user"
            description={`${room.max_occupancy} Guests`}
          />
          <InfoCard
            icon="pet"
            description={room.pet_allowed ? "Pets Allowed" : "No Pets Allowed"}
          />
        </div>
      </div>

      <h2 className="mt-7 font-bold text-xl pb-2 border-b-2 border-gray-300">
        Property Description
      </h2>
      <p className="mt-4">{room.description}</p>

      <div className="w-full md:w-3/4 lg:w-full lg:h-96 mt-4">
        <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title="Google Maps Location"
            className="w-full h-80"
            src={googleMapsEmbedUrl}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {showLoginPrompt && <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default RoomInfo;
