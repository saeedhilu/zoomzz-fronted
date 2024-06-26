import React from 'react';

const Amenities = ({ amenities }) => {
    const showAllButton = amenities.length > 4;
    return(
        <div>
      <h2 className="text-xl font-semibold mt-6">Offered Amenities</h2>
      <div className="flex flex-wrap mt-2">
        {amenities.slice(0, 3).map(amenity => (
          <div key={amenity.id} className="flex items-center mr-4 mb-2">
            <img src={amenity.image} alt={amenity.name} className="w-6 h-6 mr-2" />
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
      {showAllButton && (
        <button className="text-blue-500 mt-4">Show All {amenities.length} Amenities</button>
      )}
    </div>
    )
}

export default Amenities;
