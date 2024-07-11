import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faPencilAlt,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { getUserProfile, putUserProfile } from "../services/UserProfile";
import PhoneNumberModal from "./UserPhoneNumberChanging";

const UserProfile = () => {
  const [user, setUser] = useState({
    profileImage: null,
    email: null,
    phoneNumber: null,
    username: null,
    joinedDate: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    image: null,
  });

  const inputRef = useRef(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      const data = response.data;
      setUser({
        profileImage: data.image,
        email: data.email,
        phoneNumber: data.phone_number,
        username: data.username,
        joinedDate: data.date_joined,
      });
      setFormData({
        username: data.username,
        email: data.email,
        phoneNumber: data.phone_number,
        image: null,
      });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const newImage = e.target.files[0];
    setFormData({ ...formData, image: newImage });

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    if (newImage) {
      formDataToSend.append("image", newImage);
    }

    try {
      const response = await putUserProfile(formDataToSend);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.image,
      }));
    } catch (error) {
      console.error("Error updating profile image", error);
    }
  };

  const handlePencilClick = () => {
    setEditMode(true);
    inputRef.current.focus();
  };

  const handleUsernameBlur = async () => {
    setEditMode(false);
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);

    try {
      const response = await putUserProfile(formDataToSend);
      setUser((prevUser) => ({
        ...prevUser,
        username: response.data.username,
      }));
    } catch (error) {
      console.error("Error updating username", error);
    }
  };

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setFormData({ ...formData, phoneNumber: newPhoneNumber });
    setUser((prevUser) => ({
      ...prevUser,
      phoneNumber: newPhoneNumber,
    }));
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const getYearFromDatetime = (datetime) => {
    if (datetime) {
      return new Date(datetime).getFullYear();
    }
    return null;
  };

  return (
    <div className="flex p-4 shadow-lg">
      <div className="bg-gray-100 w-1/3 p-6 flex flex-col items-center relative rounded-lg shadow-md">
        {user.profileImage ? (
          <>
            <img
              src={user.profileImage}
              alt="Profile"
              className="rounded-full object-cover w-28 h-28 mb-4"
            />
            <label
              htmlFor="imageInput"
              className="absolute bottom-0  cursor-pointer"
            >
              <div className="bg-gray-600  rounded-xl   mb-12 ml-20">
                <FontAwesomeIcon icon={faCamera} className="text-white p-1 " />
              </div>
            </label>
          </>
        ) : (
          <>
            <div className="bg-gray-300 rounded-full w-28 h-28 flex items-center justify-center mb-4">
              <FontAwesomeIcon
                icon={faUser}
                className="text-6xl text-gray-600"
              />
              <label
                htmlFor="imageInput"
                className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
              </label>
            </div>
          </>
        )}
        <input
          type="file"
          id="imageInput"
          name="image"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex flex-col justify-center ml-16">
        {/* Conditionally render greeting based on username */}
        {user.username ? (
          <div className="flex items-center mb-6">
            <p className="text-xl font-bold text-gray-600">
              Hello, {user.username}
              {!editMode && (
                <button onClick={handlePencilClick} className="ml-4">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="text-gray-600"
                  />
                </button>
              )}
            </p>
          </div>
        ) : (
          <div className="flex items-center mb-6">
            <p className="text-xl font-bold text-gray-600">Hello, Guest</p>
          </div>
        )}

        {user.email && (
          <p className="text-gray-600 mb-1">Email: {user.email}</p>
        )}
        {user.phoneNumber && (
          <p className="text-gray-600 mb-1">
            Phone: {user.phoneNumber}
            <button
              onClick={() => setIsPhoneModalOpen(true)}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
          </p>
        )}
        
        {user.joinedDate && (
          <p className="text-gray-600 mb-6">
            Joined in {getYearFromDatetime(user.joinedDate)}
          </p>
        )}
      </div>

      <PhoneNumberModal
        isOpen={isPhoneModalOpen}
        onRequestClose={() => setIsPhoneModalOpen(false)}
        onPhoneNumberChange={handlePhoneNumberChange}
        phoneNumber={user.phoneNumber}
        className="fixed flex items-center justify-center top-0 left-0 w-full h-screen z-50"
      />
    </div>
  );
};

export default UserProfile;
