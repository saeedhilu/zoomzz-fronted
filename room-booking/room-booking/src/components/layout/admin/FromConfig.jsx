

import * as Yup from "yup";
export const vendorSignupConfig = {
  initialValues: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  },
  validationSchema: Yup.object({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    last_name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    phone_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid phone number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Required"),
  }),
  fields: [
    { name: "first_name", label: "First Name", type: "text" },
    { name: "last_name", label: "Last Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone_number", label: "Phone Number", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirm_password", label: "Confirm Password", type: "password" },
  ],
};
