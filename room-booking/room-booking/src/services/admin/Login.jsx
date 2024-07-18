// src/services/adminLogin.js

import instance from "../../utils/Axiox";

const adminLogin = async (username, password) => {
  try {
    const response = await instance.post("login-admin/", {
      username: username,
      password: password,
    });
    console.log("Response from admin login:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error from Admin Login:", error);
    throw error; // Propagate the error to handle in the component
  }
};

export default adminLogin;
