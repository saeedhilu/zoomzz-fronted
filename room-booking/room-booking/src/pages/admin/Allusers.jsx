import { useEffect } from "react";
import getAllusers from "../../services/admin/Allusers";

const Allguests = ()=>{
    const fetchData =async ()=>{
        try {
            const data = await getAllusers();
            console.log('frpm all user s sofnsogn:',data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    })
    return(
        <div className="ml-64">
            Hellpo iam guest
        </div>
    )
}
export default Allguests;