import React  from "react";
import { faPaw,faUser, faMapMarkerAlt,faBuilding } from '@fortawesome/free-solid-svg-icons'; // Import the pet and location icons


const infoCard=({icon,description})=>{
    <div>
        <div className="info-card">
            <div className="info-card-icon">
            <FontAwesomeIcon icon={icon}  className="text-2xl text-gray-600"  />

                
            </div>
            <p>{description}</p>
        </div>
    </div>
}
export default infoCard