import React, { useEffect, useState } from "react";
import getBookings from "../../services/vendor/Booking";

const Bookings = () => {
  const [bookingsData, setBookings] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = async (url = null) => {
    try {
      const response = await getBookings(url);
      setBookings(response.results);
      setNextPage(response.next);
      setPreviousPage(response.previous);

      const urlParams = new URLSearchParams(url);
      const page = parseInt(urlParams.get("page")) || 1;
      setCurrentPage(page);
    } catch (error) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchData(previousPage);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="">
      <div className="rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white">Booking List</h1>
      </div>
      <section className="mt-4">
        <div className="p-4 sm:p-10">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-2 sm:px-4 border-b">#</th>
                  <th className="py-2 px-2 sm:px-4 border-b ">Room Image</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Room Name</th>
                  <th className="py-2 px-2 sm:px-4 border-b ">User</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Status</th>border-b
                  hidden lg:table-cell
                  <th className="py-2 px-2 sm:px-4 ">Check-In</th>
                  <th className="py-2 px-2 sm:px-4 border-b ">Check-Out</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Total Guests</th>
                  <th className="py-2 px-2 sm:px-4 border-b ">Phone</th>
                  <th className="py-2 px-2 sm:px-4 border-b ">Email</th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.length > 0 ? (
                  bookingsData.map((booking, idx) => {
                    const {
                      id,
                      room_image,
                      room_name,
                      user_name,
                      reservation_status,
                      first_name,
                      last_name,
                      check_in,
                      check_out,
                      total_guest,
                      contact_number,
                      email,
                    } = booking;

                    return (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 border-b">
                          {(currentPage - 1) * rowsPerPage + idx + 1}
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-b flex items-center">
                          <img
                            src={room_image}
                            alt={room_name}
                            className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded-lg mr-4"
                          />
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-b">
                          {room_name}
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-b">
                          {user_name ? user_name : `${first_name} ${last_name}`}
                        </td>
                        <td
                          className={`py-2 px-2 sm:px-4 border-b ${
                            reservation_status === "Pending"
                              ? "text-gray-500"
                              : reservation_status === "Canceled"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {reservation_status}
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-b">
                          {new Date(check_in).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-b">
                          {new Date(check_out).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-b">
                          {total_guest}
                        </td>
                        <td
                          className={`py-2 px-2 sm:px-4 border-b ${
                            contact_number ? "" : "text-red-500"
                          }`}
                        >
                          {contact_number || "Not Available"}
                        </td>
                        <td
                          className={`py-2 px-2 sm:px-4 border-b ${
                            email ? "" : "text-red-500"
                          }`}
                        >
                          {email || "Not Available"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No bookings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={!previousPage}
            className={`px-4 py-2 rounded mb-2 sm:mb-0 ${
              !previousPage ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!nextPage}
            className={`px-4 py-2 rounded ${
              !nextPage ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default Bookings;
