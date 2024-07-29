import instance from "../../utils/Axiox";

const putBlockandUnblock= async (id)=>{
    console.log('id from axios',id);
    try {
        const response =await instance.post(`users/${id}/block-unblock/`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default putBlockandUnblock;