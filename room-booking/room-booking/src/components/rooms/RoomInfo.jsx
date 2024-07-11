import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faUser,
  faMapMarkerAlt,
  faShareNodes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "./InfoCard/InfoCard";
import RoomCategory from "./RoomCategory";
import { addToWishlist, removeFromWishlist, selectWishlist } from "../../redux/slices/whishlistSlice";
import wishlistService from "../../services/WhishlistServices";

const RoomInfo = ({ room }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const isRoomInWishlist = wishlist.includes(room.id);

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

  const handleAddToWishlist = async () => {
    try {
      await wishlistService.addToWishlist(room.id);
      dispatch(addToWishlist(room.id));
      console.log("Added to wishlist successfully", room.id);
    } catch (error) {
      console.error("Error adding room to wishlist:", error);
    }
  };

  //TODO



  
  const handleRemoveFromWishlist = async () => {
    try {
      console.log('helllo',room.id)
      await wishlistService.removeFromWishlist(room.id);
      print('handle removce from whishslist',room.id)
      dispatch(removeFromWishlist(room.id));
      console.log("Removed from wishlist successfully", room.id);
    } catch (error) {
      console.error("Error removing room from wishlist:", error);
    }
  };

  const handleWishlistToggle = () => {
    if (isRoomInWishlist) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
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
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            {`${room.location.country}, ${room.location.city}, ${room.location.name}`}
          </p>
        </div>
        <div>
          <div className="flex gap-3 text-gray-600 text-2xl mt-8">
            <FontAwesomeIcon
              icon={faHeart}
              className={`bg-white cursor-pointer ${isRoomInWishlist ? "text-red-500" : ""}`}
              onClick={handleWishlistToggle}
            />
            <FontAwesomeIcon
              icon={faShareNodes}
              className="cursor-pointer"
              onClick={handleShareClick}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3">
          <RoomCategory category={room.category} />
          <InfoCard
            icon={faUser}
            description={`${room.max_occupancy} Guests`}
          />
          <InfoCard
            icon={faPaw}
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
    </div>
  );
};

export default RoomInfo;
