import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../common/inputField";
import useGuestCount from "../../hooks/useGuestCount";
import { renderStars } from "../../utils/ratingStar";
import { createReservation } from "../../services/CreateBooking";
import { initiatePayment } from "../../services/IniatiatePayment";

const BookingForm = () => {
  const location = useLocation();
  const bookingDetails = location.state || {}; // Ensure safe access to location.state
  const {
    room = {},
    guests: initialGuests,
    checkInDate,
    checkOutDate,
    maxOccupancy,
  } = bookingDetails;

  const {
    guests,
    error: guestCountError,
    handleGuestCount,
  } = useGuestCount(initialGuests, maxOccupancy);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [checkinDate, setCheckInDate] = useState(checkInDate || "");
  const [checkoutDate, setCheckoutDate] = useState(checkOutDate || "");
  const [formError, setFormError] = useState("");

  // State to manage script loading status
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    // Load Razorpay script when component mounts
    loadRazorpayScript();

    // Clean up function to remove script when component unmounts
    return () => {
      const scriptElement = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  const calculateTotalPrice = (checkinDate, checkoutDate, pricePerNight) => {
    const checkIn = new Date(checkinDate);
    const checkOut = new Date(checkoutDate);
    const timeDifference = checkOut - checkIn;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference * pricePerNight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scriptLoaded) {
      console.error("Razorpay script not loaded.");
      return;
    }

    try {
      const reservationData = {
        first_name: firstName,
        last_name: lastName,
        email,
        contact_number: contactNumber,
        total_guest: guests,
        check_in: checkinDate,
        check_out: checkoutDate,
      };

      // Create reservation
      const reservationResponse = await createReservation(
        room.id,
        reservationData
      );

      // Calculate total price
      const totalPrice = calculateTotalPrice(
        checkinDate,
        checkoutDate,
        room.price_per_night
      );

      // Prepare payment data for Razorpay
      const paymentData = {
        amount: totalPrice * 100, // Razorpay expects amount in smallest currency unit (paisa)
        currency: "INR",
        receipt: reservationResponse.id.toString(), // Convert to string for Razorpay
        payment_capture: "1",
      };

      // Initiate payment
      
      const paymentResponse = await initiatePayment(paymentData);

      // Configure options for Razorpay checkout
      const options = {
        key: paymentResponse.key_id, // Replace with your Razorpay key
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
        name: "ZOOMZZZ",
        description: "Room Booking Payment",
        order_id: paymentResponse.order_id,
        handler: function (response) {
          // Handle successful payment
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: contactNumber,
        },
        notes: {
          address: "ZOOMZZZ",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Create Razorpay instance and open checkout form
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Booking Form Submission Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setFormError(error.response.data.non_field_errors.join(", "));
      } else {
        setFormError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner">
        <img
          src={room.image}
          alt={room.name}
          className="w-96 h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold">{room.name}</h3>
        <p className="text-gray-600 mb-2">
          {room.location?.city}, {room.location?.name}
        </p>
        <div className="flex items-center mb-4">
          <span className="text-gray-500">
            {renderStars(room.average_rating)}
          </span>
          <span className="ml-2 text-gray-600">
            ({room.user_feedbacks?.length || 0} Reviews)
          </span>
        </div>
        <p className="text-lg font-bold mb-4">
          Price per night: ₹{room.price_per_night}
        </p>
        <p className="text-lg font-bold text-gray-600 mb-4">Discount: 10%</p>
        <p className="text-lg font-bold mb-4">
          Total Price: ₹
          {calculateTotalPrice(checkinDate, checkoutDate, room.price_per_night)}
        </p>
        <p className="text-lg font-bold mb-4">
          Selected Dates: {checkinDate} to {checkoutDate}
        </p>
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
          <InputField
            label="Last Name"
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <InputField
            label="Contact Number"
            id="contactNumber"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
          />
          <InputField
            label="Check-in Date"
            id="checkinDate"
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <InputField
            label="Check-out Date"
            id="checkoutDate"
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
          />
          <InputField
            label="Guests"
            id="guests"
            type="number"
            value={guests}
            onChange={handleGuestCount}
            placeholder="Number of guests"
          />
          {guestCountError && <p className="text-red-600">{guestCountError}</p>}
          {formError && <p className="text-red-600">{formError}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
