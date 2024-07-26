// src/hooks/useGuestCount.js
import { useState } from "react";

const useGuestCount = (initialGuests, maxOccupancy) => {
  console.log(
    'initial guest:',initialGuests,
    'max occupancy:',maxOccupancy
  );
  const [guests, setGuests] = useState(initialGuests);
  const [error, setError] = useState("");

  const handleGuestCount = (e) => {
    const count = parseInt(e.target.value, 10);
   
    if (count > maxOccupancy) {
      setError(`Maximum occupancy is ${maxOccupancy}`);
    } else {
      setGuests(count);
      setError("");
    }
  };

    {console.log(guests);}
  return {

    guests,
    error,
    handleGuestCount,
  };
};

export default useGuestCount;
