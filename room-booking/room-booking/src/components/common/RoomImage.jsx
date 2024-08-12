import React from 'react';

const RoomImage = ({ imageSrc, onClick }) => (
  <img
    src={imageSrc}
    alt="room"
    className="w-10 h-10 object-cover rounded-lg"
    onClick={() => onClick(imageSrc)}
  />
);

export default RoomImage;
