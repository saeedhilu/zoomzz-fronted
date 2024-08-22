import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getRoomDetails from "../../services/RoomDetailService";
import ImageGallery from "./ImageGallery";
import RoomInfo from "./RoomInfo";
import Amenities from "./Amenities";
import Reviews from "./Reviews";
import BookingInfo from "./BookingInfo/BookingInfo";
import Spinner from "../Spinner/Spinner";

const RoomDetail = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const data = await getRoomDetails(roomId);
        
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch room details");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (loading) {
    return <div>
      <Spinner/>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 ">
      <div className="lg:flex lg:space-x-4">
        <div className="lg:w-2/3">
          <ImageGallery
            mainImage={room.image}
            otherImages={[room.image2, room.image3, room.image4, room.image5]}
          />
          <div className="mt-4">
            <RoomInfo room={room} />
            <Amenities amenities={room.amenities} />
            <Reviews
              reviews={room.user_feedbacks}
              averageRating={room.average_rating}
            />
          </div>
        </div>
        <div className="mt-4 lg:mt-0 lg:w-1/3 lg:fixed lg:top-24 lg:right-0">
          <BookingInfo room={room} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
