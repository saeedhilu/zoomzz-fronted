import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPerson } from "react-icons/bs"; // Icon for profile
import { PhoneNumberChangeModal } from "../modals/PhoneNumberChange";
import { updatePhoneNumber } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSection = ({ imageUrl, baseURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImage,
    username,
  } = useSelector((state) => state.auth);

  const handlePhoneNumberEdit = () => {
    setIsModalOpen(true);
  };

  const handlePhoneNumberUpdated = (newPhoneNumber) => {
    dispatch(updatePhoneNumber(newPhoneNumber));
    toast.success(`Phone number updated from "${phoneNumber}" to "${newPhoneNumber}" successfully!`);
    setIsModalOpen(false);
  };

  return (
    <article className="shadow-lg rounded-lg p-6 md:p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BsPerson className="mr-2 text-blue-500" />
        Profile
      </h2>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={
            profileImage
              ? imageUrl
                ? `${baseURL}${imageUrl}${profileImage}`
                : `${baseURL}${profileImage}`
              : "/default-profile.png"
          }
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
        />
        <div className="text-center md:text-left">
          <p className="text-gray-800 text-xl font-semibold mb-1">
            User Name: {username || "N/A"}
          </p>
          {firstName && <p className="text-gray-700">First Name: {firstName}</p>}
          {lastName && <p className="text-gray-700">Last Name: {lastName}</p>}
          <p className="text-gray-600 text-sm flex items-center mb-1">
            Email Address:{" "}
            {email ? email : <span className="text-red-500 ml-2">Not Provided</span>}
          </p>
          <p className="text-gray-600 text-sm flex items-center">
            Phone Number:{" "}
            {phoneNumber ? (
              <span className="ml-2">{phoneNumber}</span>
            ) : (
              <span className="text-red-500 ml-2">Not Provided</span>
            )}
            {phoneNumber && (
              <button
                onClick={handlePhoneNumberEdit}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <AiOutlineEdit className="inline-block w-5 h-5" />
              </button>
            )}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <PhoneNumberChangeModal
          onRequestClose={() => setIsModalOpen(false)}
          onPhoneNumberUpdated={handlePhoneNumberUpdated}
        />
      )}

      <ToastContainer />
    </article>
  );
};

export default ProfileSection;
