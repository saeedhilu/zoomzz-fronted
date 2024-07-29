import instance from "../../utils/Axiox";

const putBlockandUnblock=(id)=>{
    try {
        const response = instance.post(`users/${id}/block-unblock/`)
        console.log('response from instance ',response);
    } catch (error) {
        console.log(error);
    }
}

export default putBlockandUnblock;