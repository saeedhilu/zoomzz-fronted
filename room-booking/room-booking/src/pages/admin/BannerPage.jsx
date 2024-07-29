import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa"; // Import FaTimes icon
import getBanner from "../../services/Banner";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
  const localhost = "http://127.0.0.1:8000/";

  const fetchBanner = async () => {
    try {
      const data = await getBanner();
      setBanner(data);
    } catch (error) {
      console.log("error from category ", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <main className="ml-64 p-6">
      <header>
        <h1 className="text-3xl font-bold border-b-2 border-gray-400 pb-2">
          Banner Management
        </h1>
      </header>

      <section className="mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Banner Content</th>
              <th className="py-3 px-4 text-left">Button Text</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {banner.map((banner, idx) => (
              <tr
                key={banner.id}
                className={`hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{banner.id}</td>
                <td className="py-3 px-4">
                  <img
                    className="w-32 h-20 rounded-lg cursor-pointer"
                    src={banner.image_url}
                    alt={banner.title}
                    onClick={() => handleImageClick(banner.image_url)} // Open modal on click
                  />
                </td>
                <td className="py-3 px-4">{banner.title}</td>
                <td className="py-3 px-4">{banner.banner_content}</td>
                <td className="py-3 px-4">{banner.button_text}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${banner.title}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${banner.title}`}
                    >
                      <FaTrashAlt className="w-5 h-5" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal for displaying the full-size image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-black p-2 rounded-full hover:bg-gray-200"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img
              className="max-w-screen-sm max-h-screen"
              src={selectedImage}
              alt="Full-size view"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Banner;
