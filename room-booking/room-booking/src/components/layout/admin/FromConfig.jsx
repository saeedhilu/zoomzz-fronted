import * as Yup from "yup";

export const vendorSignupConfig = {
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid phone number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Required"),
  }),
  fields: [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ],
};

export const userSignupConfig = {
  initialValues: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Required"),
  }),
  fields: [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ],
};
