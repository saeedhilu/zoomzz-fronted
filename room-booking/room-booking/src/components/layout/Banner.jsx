import React, { useEffect, useState } from "react";
import getBanner from "../../services/Banner";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerData = await getBanner();
        console.log('Banner image is :',bannerData);
        
        setBanners(bannerData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center my-4">Loading banners...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 my-4">Error: {error}</p>;
  }
  const handleHost = () => {
    navigate("/host-page");
  };

  return (
    <div className="container mx-auto mt-20 ">
      {banners.map((banner) => (
        <div key={banner.id} className="relative flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden shadow-xl my-6">
          <div className="md:w-1/2 p-8 relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">{banner.title}</h3>
            <p className="text-gray-700 mb-6">{banner.banner_content}</p>
            
            <button className="bg-gray-500 text-white px-6 py-2 rounded-full" onClick={handleHost}>{banner.button_text}</button>
            
          </div>
          <div className="md:w-1/2 relative">
            <img className="w-full h-64 md:h-full object-cover" src={banner.image} alt={banner.title} />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-full w-full bg-gradient-to-r sm:from-white to-transparent"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="h-full w-1/2 bg-red md:hidden sm:hidden"></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
