import React, { useState } from "react";


const ImageGallery = ({ mainImage, otherImages }) => {
  const [currentMainImage, setCurrentMainImage] = useState(mainImage);
  const [showAll, setShowAll] = useState(false);
  const ExtraimageCount = otherImages.length-2
  
  const handleImageClick = (image) => {
    setCurrentMainImage(image);
  };
  const moreImageHandler = () => {
    setShowAll(true);
  };
  const imageShowingCount = showAll ? otherImages.lenght : 2;

  return (
    <div className="flex flex-wrap gap-4 ">
      <div className="w-full">
        <img
          src={currentMainImage}
          alt="Main"
          className="w-full h-80 rounded-lg object-cover cursor-pointer"
          onClick={() => handleImageClick(mainImage)}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex  gap-4">
          {otherImages.slice(0, imageShowingCount).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Other ${index + 1}`}
              className={`w-2/5 h-24 object-cover cursor-pointer transition-opacity duration-100 ${showAll ? 'opacity-100' : 'opacity-90'}`}
              onClick={() => handleImageClick(image)}
            />
          ))}

          {showAll ? (
            ""
          ) : (
            <div className="flex">
              <button onClick={moreImageHandler} className="p-2 bg-gray-100 rounded-md shadow-md w-24 font-bold " >+{ExtraimageCount} <p className="font-thin">More Photos</p> </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
