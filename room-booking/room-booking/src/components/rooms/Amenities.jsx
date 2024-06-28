import React from "react";

const Amenities = ({ amenities }) => {
  const showAllButton = amenities.length > 4;
  return (
    <div>
      <h2 className="mt-7 font-bold w-52 text-xl pb-2 border-b-2  border-gray-300">
        Offered Amenities
      </h2>
      <div className=" mt-2">
        <div className="flex flex-wrap gap-10">
        {amenities.slice(0, 3).map((amenity) => (
          <div key={amenity.id} className="flex items-center mr-4 mb-2 ">
            <img
              src={amenity.image}
              alt={amenity.name}
              className="w-12 h-12 mt-3 "
            />
            <span className="ml-4 font-semibold" >{amenity.name}</span>
          </div>
        ))}

        </div>
        
      </div>
      {showAllButton && (
        <button className="text-blue-500 mt-4">
          Show All {amenities.length} Amenities
        </button>
      )}
    </div>
  );
};

export default Amenities;
