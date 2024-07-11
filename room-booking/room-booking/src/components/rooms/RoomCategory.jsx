import React from "react";
const RoomCategory = ({ category }) => {
  return (
    <div className=" bg-slate-100 p-4 shadow-lg rounded-sm  w-36">
      <div className="img-div w-10 m-auto">
        <img src={category.image} alt="catogary image" />
      </div>
      <h2 className="font-semibold text-center">
        {category.name}
      </h2>
    </div>
  );
};

export default RoomCategory;
