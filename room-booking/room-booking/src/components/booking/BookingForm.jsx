import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useGuestCount from "../../hooks/useGuestCount";
import { renderStars } from "../../utils/ratingStar";
import { createReservation } from "../../services/CreateBooking";
import { initiatePayment } from "../../services/IniatiatePayment";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {};
  const {
    room = {},
    guests: initialGuests,
    checkInDate,
    checkOutDate,
    maxOccupancy,
  } = bookingDetails;

  const { guests, error: guestCountError, handleGuestCount } = useGuestCount(initialGuests, maxOccupancy);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadRazorpayScript();

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


  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    checkinDate: Yup.date()
      .required("Check-in date is required")
      .min(new Date(), "Check-in date must be in the future"),
    checkoutDate: Yup.date()
      .required("Check-out date is required")
      .min(Yup.ref('checkinDate'), "Check-out date must be after check-in date"),
    guests: Yup.number()
      .required("Number of guests is required")
      .min(1, "At least one guest is required")
      .max(maxOccupancy, `Maximum occupancy is ${maxOccupancy}`),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (!scriptLoaded) {
      console.error("Razorpay script not loaded.");
      setSubmitting(false);
      return;
    }

    try {
      const reservationData = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        contact_number: values.contactNumber,
        total_guest: values.guests,
        check_in: values.checkinDate,
        check_out: values.checkoutDate,
      };

      // Create reservation
      const reservationResponse = await createReservation(room.id, reservationData);

      // Calculate total price
      const totalPrice = calculateTotalPrice(values.checkinDate, values.checkoutDate, room.price_per_night);

      // Prepare payment data for Razorpay
      const paymentData = {
        amount: totalPrice * 100, // Razorpay expects amount in smallest currency unit (paisa)
        currency: "INR",
        receipt: reservationResponse.id, // Convert to string for Razorpay
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
          // alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          navigate("/reservations-status"); // Navigate to history page on success
        },
        prefill: {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          contact: values.contactNumber,
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
      setErrors({
        form: error.response?.data?.non_field_errors?.join(", ") || "An unexpected error occurred.",
      });
    } finally {
      setSubmitting(false);
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
          {calculateTotalPrice(checkInDate, checkOutDate, room.price_per_night)}
        </p>
        <p className="text-lg font-bold mb-4">
          Selected Dates: {checkInDate} to {checkOutDate}
        </p>
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            checkinDate: checkInDate || "",
            checkoutDate: checkOutDate || "",
            guests: guests || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-600" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-gray-700">Contact Number</label>
                <Field
                  id="contactNumber"
                  name="contactNumber"
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="contactNumber" component="div" className="text-red-600" />
              </div>
              <div>
                <label htmlFor="checkinDate" className="block text-gray-700">Check-in Date</label>
                <Field
                  id="checkinDate"
                  name="checkinDate"
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="checkinDate" component="div" className="text-red-600" />
              </div>
              <div>
                <label htmlFor="checkoutDate" className="block text-gray-700">Check-out Date</label>
                <Field
                  id="checkoutDate"
                  name="checkoutDate"
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="checkoutDate" component="div" className="text-red-600" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-gray-700">Number of Guests</label>
                <Field
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max={maxOccupancy}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="guests" component="div" className="text-red-600" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Processing..." : "Book Now"}
              </button>
              <ErrorMessage name="form" component="div" className="text-red-600 mt-4" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingForm;
