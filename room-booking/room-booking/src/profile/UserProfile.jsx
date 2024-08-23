// // import React, { useEffect, useState, useRef } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faUser,
// //   faPlus,
// //   faPencilAlt,
// //   faCamera,
// // } from "@fortawesome/free-solid-svg-icons";
// // import { getUserProfile, putUserProfile } from "../services/UserProfile";
// // import PhoneNumberModal from "./UserPhoneNumberChanging";

// // const UserProfile = () => {
// //   const [user, setUser] = useState({
// //     profileImage: null,
// //     email: null,
// //     phoneNumber: null,
// //     username: null,
// //     joinedDate: null,
// //   });

// //   const [editMode, setEditMode] = useState(false);
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     phoneNumber: "",
// //     image: null,
// //   });

// //   const inputRef = useRef(null);
// //   const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

// //   const fetchUserProfile = async () => {
// //     try {
// //       const response = await getUserProfile();
// //       const data = response.data;
// //       setUser({
// //         profileImage: data.image,
// //         email: data.email,
// //         phoneNumber: data.phone_number,
// //         username: data.username,
// //         joinedDate: data.date_joined,
// //       });
// //       setFormData({
// //         username: data.username,
// //         email: data.email,
// //         phoneNumber: data.phone_number,
// //         image: null,
// //       });
// //     } catch (error) {
// //       console.error("Error fetching profile", error);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleImageChange = async (e) => {
// //     const newImage = e.target.files[0];
// //     setFormData({ ...formData, image: newImage });

// //     const formDataToSend = new FormData();
// //     formDataToSend.append("username", formData.username);
// //     if (newImage) {
// //       formDataToSend.append("image", newImage);
// //     }

// //     try {
// //       const response = await putUserProfile(formDataToSend);
// //       setUser((prevUser) => ({
// //         ...prevUser,
// //         profileImage: response.data.image,
// //       }));
// //     } catch (error) {
// //       console.error("Error updating profile image", error);
// //     }
// //   };

// //   const handlePencilClick = () => {
// //     setEditMode(true);
// //     inputRef.current.focus();
// //   };

// //   const handleUsernameBlur = async () => {
// //     setEditMode(false);
// //     const formDataToSend = new FormData();
// //     formDataToSend.append("username", formData.username);

// //     try {
// //       const response = await putUserProfile(formDataToSend);
// //       setUser((prevUser) => ({
// //         ...prevUser,
// //         username: response.data.username,
// //       }));
// //     } catch (error) {
// //       console.error("Error updating username", error);
// //     }
// //   };

// //   const handlePhoneNumberChange = (newPhoneNumber) => {
// //     setFormData({ ...formData, phoneNumber: newPhoneNumber });
// //     setUser((prevUser) => ({
// //       ...prevUser,
// //       phoneNumber: newPhoneNumber,
// //     }));
// //   };

// //   useEffect(() => {
// //     fetchUserProfile();
// //   }, []);

// //   const getYearFromDatetime = (datetime) => {
// //     if (datetime) {
// //       return new Date(datetime).getFullYear();
// //     }
// //     return null;
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row p-4 shadow-xl bg-white rounded-lg max-w-4xl mx-auto my-8">
// //       <div className="bg-gray-100 w-full md:w-1/3 p-6 flex flex-col items-center relative rounded-lg shadow-md">
// //         {user.profileImage ? (
// //           <>
// //             <img
// //               src={user.profileImage}
// //               alt="Profile"
// //               className="rounded-full object-cover w-28 h-28 mb-4"
// //             />
// //             <label
// //               htmlFor="imageInput"
// //               className="absolute bottom-0 right-0 cursor-pointer"
// //             >
// //               <div className="bg-gray-600 rounded-xl mb-2 ml-20">
// //                 <FontAwesomeIcon icon={faCamera} className="text-white p-1" />
// //               </div>
// //             </label>
// //           </>
// //         ) : (
// //           <>
// //             <div className="bg-gray-300 rounded-full w-28 h-28 flex items-center justify-center mb-4">
// //               <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-600" />
// //               <label
// //                 htmlFor="imageInput"
// //                 className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer"
// //               >
// //                 <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
// //               </label>
// //             </div>
// //           </>
// //         )}
// //         <input
// //           type="file"
// //           id="imageInput"
// //           name="image"
// //           onChange={handleImageChange}
// //           className="hidden"
// //         />
// //       </div>

// //       <div className="flex flex-col justify-center ml-0 md:ml-16 mt-4 md:mt-0">
// //         {user.username ? (
// //           <div className="flex items-center mb-6">
// //             <p className="text-xl font-bold text-gray-600">
// //               Hello, {user.username}
// //               {!editMode && (
// //                 <button onClick={handlePencilClick} className="ml-4">
// //                   <FontAwesomeIcon icon={faPencilAlt} className="text-gray-600" />
// //                 </button>
// //               )}
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="flex items-center mb-6">
// //             <p className="text-xl font-bold text-gray-600">Hello, Guest</p>
// //           </div>
// //         )}

// //         {user.email && (
// //           <p className="text-gray-600 mb-1">Email: {user.email}</p>
// //         )}
// //         {user.phoneNumber && (
// //           <p className="text-gray-600 mb-1">
// //             Phone: {user.phoneNumber}
// //             <button
// //               onClick={() => setIsPhoneModalOpen(true)}
// //               className="ml-2 text-gray-500"
// //             >
// //               Edit
// //             </button>
// //           </p>
// //         )}

// //         {user.joinedDate && (
// //           <p className="text-gray-600 mb-6">
// //             Joined in {getYearFromDatetime(user.joinedDate)}
// //           </p>
// //         )}
// //       </div>

// //       <PhoneNumberModal
// //         isOpen={isPhoneModalOpen}
// //         onRequestClose={() => setIsPhoneModalOpen(false)}
// //         onPhoneNumberChange={handlePhoneNumberChange}
// //         phoneNumber={user.phoneNumber}
// //         className="fixed flex items-center justify-center top-0 left-0 w-full h-screen z-50"
// //       />
// //     </div>
// //   );
// // };

// // export default UserProfile;

// import React, { useEffect, useState, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faPlus, faPencilAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
// import { getUserProfile, putUserProfile } from "../services/UserProfile";
// import { PhoneNumberChangeModal } from "../components/modals/PhoneNumberChange";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     profileImage: null,
//     email: null,
//     phoneNumber: null,
//     username: null,
//     joinedDate: null,
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     image: null,
//   });

//   const inputRef = useRef(null);
//   const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await getUserProfile();
//       const data = response.data;
//       setUser({
//         profileImage: data.image,
//         email: data.email,
//         phoneNumber: data.phone_number,
//         username: data.username,
//         joinedDate: data.date_joined,
//       });
//       setFormData({
//         username: data.username,
//         email: data.email,
//         phoneNumber: data.phone_number,
//         image: null,
//       });
//     } catch (error) {
//       console.error("Error fetching profile", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = async (e) => {
//     const newImage = e.target.files[0];
//     setFormData({ ...formData, image: newImage });

//     const formDataToSend = new FormData();
//     formDataToSend.append("username", formData.username);
//     if (newImage) {
//       formDataToSend.append("image", newImage);
//     }

//     try {
//       const response = await putUserProfile(formDataToSend);
//       setUser((prevUser) => ({
//         ...prevUser,
//         profileImage: response.data.image,
//       }));
//     } catch (error) {
//       console.error("Error updating profile image", error);
//     }
//   };

//   const handlePencilClick = () => {
//     setEditMode(true);
//     inputRef.current.focus();
//   };

//   const handleUsernameBlur = async () => {
//     setEditMode(false);
//     const formDataToSend = new FormData();
//     formDataToSend.append("username", formData.username);

//     try {
//       const response = await putUserProfile(formDataToSend);
//       setUser((prevUser) => ({
//         ...prevUser,
//         username: response.data.username,
//       }));

//     } catch (error) {
//       console.error("Error updating username", error);
//     }
//   };

//   const handlePhoneNumberChange = (newPhoneNumber) => {
//     setFormData({ ...formData, phoneNumber: newPhoneNumber });
//     setUser((prevUser) => ({
//       ...prevUser,
//       phoneNumber: newPhoneNumber,
//     }));
//     toast.success("Phone number updated successfully!");
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const getYearFromDatetime = (datetime) => {
//     if (datetime) {
//       return new Date(datetime).getFullYear();
//     }
//     return null;
//   };

//   return (
//     <div className="flex flex-col md:flex-row p-4 shadow-xl bg-white rounded-lg max-w-4xl mx-auto my-8">
//       <div className="bg-gray-100 w-full md:w-1/3 p-6 flex flex-col items-center relative rounded-lg shadow-md">
//         {user.profileImage ? (
//           <>
//             <img
//               src={user.profileImage}
//               alt="Profile"
//               className="rounded-full object-cover w-28 h-28 mb-4"
//             />
//             <label
//               htmlFor="imageInput"
//               className="absolute bottom-0 right-0 cursor-pointer"
//             >
//               <div className="bg-gray-600 rounded-xl mb-2 ml-20">
//                 <FontAwesomeIcon icon={faCamera} className="text-white p-1" />
//               </div>
//             </label>
//           </>
//         ) : (
//           <>
//             <div className="bg-gray-300 rounded-full w-28 h-28 flex items-center justify-center mb-4">
//               <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-600" />
//             </div>
//             <label
//               htmlFor="imageInput"
//               className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer"
//             >
//               <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
//             </label>
//           </>
//         )}
//       </div>

//       <div className="flex-1 p-4">
//         <div className="mb-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-semibold">Username</h3>
//             <button onClick={handlePencilClick}>
//               <FontAwesomeIcon icon={faPencilAlt} />
//             </button>
//           </div>
//           <input
//             ref={inputRef}
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             onBlur={handleUsernameBlur}
//             disabled={!editMode}
//             className={`mt-2 w-full p-2 border ${
//               editMode ? "border-gray-500" : "border-gray-300"
//             } rounded-md`}
//           />
//         </div>

//         <div className="mb-4">
//           <h3 className="text-xl font-semibold">Email</h3>
//           <p>{user.email}</p>
//         </div>

//         <div className="mb-4">
//           <h3 className="text-xl font-semibold">Phone Number</h3>
//           <div className="flex items-center">
//             <p>{user.phoneNumber || "Not Provided"}</p>
//             <button
//               onClick={() => setIsPhoneModalOpen(true)}
//               className="ml-2 text-gray-500 hover:text-gray-700"
//             >
//               <FontAwesomeIcon icon={faPencilAlt} />
//             </button>
//           </div>
//         </div>

//         <div className="mb-4">
//           <h3 className="text-xl font-semibold">Joined</h3>
//           <p>{getYearFromDatetime(user.joinedDate)}</p>
//         </div>
//       </div>

//       {isPhoneModalOpen && (
//         <PhoneNumberChangeModal
//           onRequestClose={() => setIsPhoneModalOpen(false)}
//           onPhoneNumberUpdated={handlePhoneNumberChange}
//         />
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UserProfile;















import { FcEditImage } from "react-icons/fc";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faPencilAlt,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { getUserProfile, putUserProfile } from "../services/UserProfile";
import { PhoneNumberChangeModal } from "../components/modals/PhoneNumberChange";
import EmailChangeModal from "../components/modals/EmailChange";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import changeEmail from "../services/common/ChangeEmail";
import verifyEmailChange from "../services/common/VerifyEmailChange";

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

  const [otp, setOtp] = useState(""); 
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const inputRef = useRef(null); // Initialize the ref
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // State for Email Modal

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
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  const handleUsernameBlur = async () => {
    setEditMode(false);
    const formDataToSend = new FormData();
    if (user.username === formData.username){
      toast.error(`Username  ${formData.username} unchanged. No update needed. `);
      return
     
    }  
    formDataToSend.append("username", formData.username);
    try {
      const response = await putUserProfile(formDataToSend);
      setUser((prevUser) => ({
        ...prevUser,
        username: response.data.username,
      }));
      toast.success(`Updating ${formData.username} Successfully `);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.username
      ) {
        // Handle specific error for username
        toast.error(`${error.response.data.username[0]}(${formData.username})`);
      } else {
        // Handle generic errors
        toast.error("Error updating username.");
      }
      console.error("Error updating username", error);
    }
  };

  const handleEmailChange = async (newEmail) => {
    try {
      const response = await changeEmail(newEmail); // Adjust the data format
      toast.success("OTP sent to your email!");
      setOtpSent(true);
      setFormData({ ...formData, email: newEmail }); // Update email in formData
    } catch (error) {
      toast.error("Error sending OTP.");
      console.error("Error sending OTP", error);
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await verifyEmailChange(formData.email, otp);
      toast.success("Email updated successfully!");
      fetchUserProfile(); // Refresh user data
      setOtpSent(false); // Reset OTP sent state
    } catch (error) {
      toast.error("Invalid OTP or OTP expired.");
      console.error("Error verifying OTP", error);
    }
  };

  const handlePhoneNumberChange = async (newPhoneNumber) => {
    setIsPhoneModalOpen(false);
    const formDataToSend = new FormData();
    formDataToSend.append("phone_number", newPhoneNumber);

    try {
      const response = await putUserProfile(formDataToSend);
      setUser((prevUser) => ({
        ...prevUser,
        phoneNumber: response.data.phone_number,
      }));
      toast.success("Phone number updated successfully!");
    } catch (error) {
      toast.error("Error updating phone number.");
      console.error("Error updating phone number", error);
    }
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
    <div className="flex flex-col md:flex-row p-4 shadow-xl bg-white rounded-lg max-w-4xl mx-auto my-8">
      <div className="bg-gray-100 w-full md:w-1/3 p-6 flex flex-col items-center relative rounded-lg shadow-md">
        {user.profileImage ? (
          <>
            <img
              src={user.profileImage}
              alt="Profile"
              className="rounded-full object-cover mb-4"
            />
            <label
              htmlFor="imageInput"
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <div className="bg-gray-300 rounded-xl mb-2 ">
                <FcEditImage size={30} />
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

      <div className="flex flex-col justify-center ml-0 md:ml-16 mt-4 md:mt-0">
        {user.username ? (
          <div className="flex items-center mb-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleUsernameBlur}
              ref={inputRef} // Assign ref to input
              className={`text-xl font-bold text-gray-600 ${
                !editMode ? "hidden" : ""
              }`}
            />
            <p
              className={`text-xl font-bold text-gray-600 ${
                editMode ? "hidden" : ""
              }`}
            >
              Hello, {user.username}
              <button onClick={handlePencilClick} className="ml-4">
                <FontAwesomeIcon icon={faPencilAlt} className="text-gray-600" />
              </button>
            </p>
          </div>
        ) : (
          <div className="flex items-center mb-6">
            <p className="text-xl font-bold text-gray-600">Hello, Guest</p>
          </div>
        )}

        <div className="mb-4">
          <section></section>
          <label className="block text-gray-600 font-semibold">Email:</label>
          <div className="flex items-center">
            <p>{user.email}</p>
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="ml-2 text-gray-500"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Phone:</label>
          <p>{user.phoneNumber}</p>
          <button
            onClick={() => setIsPhoneModalOpen(true)}
            className="ml-2 text-gray-500"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        </div>

        <div>
          <label className="block text-gray-600 font-semibold">Joined in:</label>
          <p>{getYearFromDatetime(user.joinedDate)}</p>
        </div>
      </div>

      {/* Conditionally render the modals */}
      {isPhoneModalOpen && (
        <PhoneNumberChangeModal
          isOpen={isPhoneModalOpen}
          onRequestClose={() => setIsPhoneModalOpen(false)}
          onPhoneNumberChange={handlePhoneNumberChange}
        />
      )}

      {isEmailModalOpen && (
        <EmailChangeModal
          isOpen={isEmailModalOpen} // Pass the state for opening modal
          onClose={() => setIsEmailModalOpen(false)} // Handle closing modal
          onEmailChange={handleEmailChange} // Handle email change
          otp={otp} // Pass OTP state
          setOtp={setOtp} // Pass OTP state setter
          otpSent={otpSent} // Pass OTP sent state
          onOtpVerification={handleOtpVerification} // Handle OTP verification
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
