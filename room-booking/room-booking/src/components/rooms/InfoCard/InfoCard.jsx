import React  from "react";


const infoCard=({icon,description})=>{
    <div>
        <div className="info-card">
            <div className="info-card-icon">
                <i className={icon}></i>
                
            </div>
            <p>{description}</p>
        </div>
    </div>
}
export default infoCard