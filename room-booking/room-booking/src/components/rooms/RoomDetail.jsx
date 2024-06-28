import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getRoomDetails from "../../services/RoomDetailService";
import ImageGallery from "./ImageGallery";
import RoomInfo from "./RoomInfo";
import Amenities from "./Amenities";
import Reviews from "./Reviews";
import BookingInfo from "./BookingInfo/BookingInfo";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>No room details available.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex">
        <div className="w-2/3 p-4">
          <ImageGallery
            mainImage={room.image}
            otherImages={[room.image2, room.image3, room.image4, room.image5]}
          />
          <div className="p-6">
            <RoomInfo room={room} />
            <Amenities amenities={room.amenities} />
            <Reviews
              reviews={room.user_feedbacks}
              averageRating={room.average_rating}
            />
          </div>
        </div>
        <div className="w-1/3 pl-8">
          <BookingInfo room={room} />
        </div>
        p-6
      </div>
    </div>
  );
};

export default RoomDetail;
