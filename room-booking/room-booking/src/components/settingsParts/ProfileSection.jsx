import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineEdit,
} from "react-icons/ai";
import { PhoneNumberChangeModal } from "../modals/PhoneNumberChange";
import { updatePhoneNumber } from "../../redux/slices/authSlice"
import { ToastContainer,toast } from "react-toastify";
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
    toast.success(`Phone number "${phoneNumber}" Update to ${newPhoneNumber} successfully!`);
    setIsModalOpen(false);
  };

  return (
    <article className="shadow-md rounded-lg p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
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
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <p className="text-gray-700 text-xl font-semibold">
            User Name : {username || "N/A"}
          </p>
          {firstName && <p>First Name : {firstName}</p>}
          {lastName && <p>Last Name : {lastName}</p>}
          <p className="text-gray-600 text-sm flex items-center">
            Email Address :{" "}
            {email ? email : <span className="text-red-500">Not Provided</span>}
          </p>
          <p className="text-gray-600 text-sm flex items-center">
            Phone Number :{" "}
            {phoneNumber ? (
              phoneNumber
            ) : (
              <span className="text-red-500">Not Provided</span>
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
    </article>
  );
};

export default ProfileSection;
