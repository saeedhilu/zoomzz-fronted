import instance from "../utils/Axiox";

export const getUserProfile = async () => {
    try {
        const response = await instance.get('accounts/user/update/');
        console.log('userprofile rooms are :', response);
        return response;
    } catch (error) {
        console.error('Error:...', error);
        throw error;
    }
};

export const putUserProfile = async (data) => {
    try {
        const response = await instance.put('accounts/user/update/', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

export default { getUserProfile, putUserProfile };
