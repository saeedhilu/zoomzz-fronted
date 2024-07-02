import instance from "../utils/Axiox";

const getBanner = async () => {
    try {
        const response = await instance.get('banners/');
        console.log(response.data);
        return response.data; 
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error; 
    }
};

export default getBanner;
