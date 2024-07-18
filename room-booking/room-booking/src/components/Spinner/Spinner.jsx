import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <TailSpin
        height="60"
        width="60"
        color="#525252"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
