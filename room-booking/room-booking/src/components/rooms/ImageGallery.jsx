import React, { useState } from 'react';

const ImageGallery = ({ mainImage, otherImages }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <img src={mainImage} alt="Main" className="w-full h-64 object-cover col-span-2" />
      {otherImages.slice(0, showAll ? otherImages.length : 2).map((image, index) => (
        <img key={index} src={image} alt={`Other ${index + 1}`} className="w-full h-32 object-cover" />
      ))}
      {!showAll && otherImages.length > 2 && (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-lg cursor-pointer" onClick={handleShowAllClick}>
          +{otherImages.length - 2} More Photos
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
