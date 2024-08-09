import instance from "../../utils/Axiox";

const getCountry = async () => {
  try {
    const response = await instance.get("countries/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export default getCountry;
