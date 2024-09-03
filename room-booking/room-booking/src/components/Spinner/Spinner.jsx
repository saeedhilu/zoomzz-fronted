import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import loader from "../../assets/roomSpinner.gif"
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      {/* <TailSpin
        height="60"
        width="60"
        color="#525252"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
      <img
        className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40"
        src={loader}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;