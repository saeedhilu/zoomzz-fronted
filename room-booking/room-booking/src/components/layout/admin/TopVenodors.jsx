import React, { useEffect, useState } from "react";

import getTopVendors from "../../../services/admin/TopVendors";

const TopVendors = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await getTopVendors();
        console.log("data os :", data);
        setVendors(data);
      } catch (error) {
        console.error("Error fetching top vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <section className="mt-8  w-full ">
      <h2 className="text-2xl font-bold mb-4">Top 5 Vendors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">Avatar</th>

              <th className="px-6 py-3 text-left">Name</th>

              <th className="py-3 px-4 text-left">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-4">
                  <img
                    src={vendor.image_url}
                    alt="vendor-image"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-4">{vendor.username}</td>

                <td className="py-3 px-4">{vendor.total_bookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopVendors;
