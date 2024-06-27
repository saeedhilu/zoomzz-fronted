import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageGallery = ({ mainImage, otherImages }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {!showAll ? (
        <>
          <div className="w-1/2">
            <img src={mainImage} alt="Main" className="w-full h-64 object-cover" />
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            {otherImages.slice(0, 2).map((image, index) => (
              <img key={index} src={image} alt={`Other ${index + 1}`} className="w-full h-32 object-cover" />
            ))}
            {otherImages.length > 2 && (
              <div
                className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-lg cursor-pointer"
                onClick={handleShowAllClick}
              >
                +{otherImages.length - 2} More Photos
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full mt-4">
          <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true} useKeyboardArrows={true}>
            {[mainImage, ...otherImages].map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Carousel ${index + 1}`} className="w-full h-64 object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
