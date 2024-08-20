import React from 'react';
import { MdOutlineAddBusiness } from "react-icons/md";
const AddNewButton = ({ onClick, label }) => {
  console.log('label ius :',label);
  
  return (
    <button
      className="bg-gray-600 p-3 rounded-lg text-white hover:bg-gray-800 flex items-center justify-center h-14"
      onClick={onClick}
    >
      {/* <span className=" lg:hidden pr-14">
      <MdOutlineAddBusiness size={30} />
      </span> */}
      <span className=" ">
        {label}
      </span>
    </button>
  );
};

export default AddNewButton;
