import instance from "../../utils/Axiox";

const getCity = async () => {
  try {
    const response = await instance.get("city/");
    return response.data;

  } catch (error) {
    console.error("Error fetching Cityies:", error);
    throw error;
  }
};
export default getCity;
