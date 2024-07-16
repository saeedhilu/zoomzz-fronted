import React from "react";

const VendorPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4 sm:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Vendor Page</h1>
        </div>
      </header>

      
      <main className="container mx-auto py-8 px-4 sm:px-8">
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div className="w-full sm:w-1/2 sm:mr-4">
              <img
                src="https://media.istockphoto.com/id/1900739940/photo/living-room-in-trend-peach-color-color-2024-year-grey-sofa-with-peach-color-paint-wall.webp?b=1&s=170667a&w=0&k=20&c=4ltBYiR22Lym30m1wlGO0UU1FktjbJoCLflQF41KIVY="
                alt="Vendor Image"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Vendor Page
              </h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                consectetur ex a mi feugiat, nec congue lorem volutpat. Fusce
                sit amet efficitur nisi, vel tempor dui.
              </p>
              <button className="bg-gray-600 p-2 mt-5 rounded-3xl text-white">
                Click To Host
              </button>
            </div>
          </div>
        </section>

       
      </main>

    
    </div>
  );
};

export default VendorPage;
