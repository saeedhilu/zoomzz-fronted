import React from "react";


const RoomCategory = ({category})  =>{
    return (

        <div className="flex  ">
            <h1 className="mt-3">{category.name}</h1>
            <div className="img-div w-10">
            <img src={category.image} alt="catogary image" / >

            </div>
        </div>
    )
}
export default RoomCategory;