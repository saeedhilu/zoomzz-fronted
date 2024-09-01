import React, { useEffect, useState } from "react";
import getSummaryStatics from "../../services/admin/SummaryStatics";

const BecomeMemberPage = () => {
  const [statistics, setStatistics] = useState({
    total_bookings: 0,
    total_rooms: 0,
    total_vendors: 0,
    total_check_ins: 0,
    total_check_outs: 0,
    total_users: 0,
  });

  const fetchData = async () => {
    try {
      const data = await getSummaryStatics();
      setStatistics(data);
      console.log('Data:', data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-white shadow-md w-full">
        <div className="container mx-auto py-4 px-4 sm:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Join Zoomzzz Today!</h1>
          <p className="text-gray-600 text-lg mt-2">
            Unlock exclusive features and benefits by becoming a member.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-8 flex-grow">
        <section className="mb-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <img
              src="https://media.istockphoto.com/id/1900739940/photo/living-room-in-trend-peach-color-color-2024-year-grey-sofa-with-peach-color-paint-wall.webp?b=1&s=170667a&w=0&k=20&c=4ltBYiR22Lym30m1wlGO0UU1FktjbJoCLflQF41KIVY="
              alt="Zoomzzz Membership"
              className="w-full sm:w-1/2 sm:mr-4 rounded-lg shadow-md"
            />
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0 text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Join Zoomzzz?</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Priority room booking.</li>
                <li>Exclusive member discounts.</li>
                <li>Access to premium features.</li>
                <li>Personalized customer support.</li>
                <li>Early access to new features.</li>
                <li>Customized booking experience.</li>
                <li>Members-only events and webinars.</li>
                <li>Loyalty rewards program.</li>
                <li>Enhanced security features.</li>
                <li>Networking opportunities.</li>
              </ul>
              <a
                href="/vendor-signup"
                className="bg-gray-600 text-white text-lg font-semibold px-6 py-3 mt-6 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 inline-block"
              >
                Become a Member
              </a>
            </div>
          </div>
        </section>

        <section className="mb-8">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Platform in Numbers</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
    <div className="text-center shadow-lg p-10 rounded-lg bg-white">
      <h3 className="text-4xl font-bold text-gray-600">Total Users</h3>
      <p className="text-gray-700 text-2xl font-bold">{statistics.total_users}</p>
    </div>
    <div className="text-center shadow-lg p-10 rounded-lg bg-white">
      <h3 className="text-4xl font-bold text-gray-600">Total Rooms</h3>
      <p className="text-gray-700 text-2xl font-bold">{statistics.total_rooms}</p>
    </div>
    <div className="text-center shadow-lg p-10 rounded-lg bg-white">
      <h3 className="text-4xl font-bold text-gray-600">Total Bookings</h3>
      <p className="text-gray-700 text-2xl font-bold">{statistics.total_bookings}</p>
    </div>
  </div>
</section>


        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">What Our Members Say</h2>
          <div className="flex flex-col space-y-6 items-center">
            <blockquote className="bg-white p-6 rounded-lg shadow-md max-w-lg text-left">
              <p className="text-lg text-gray-800 italic">
                "Joining Zoomzzz as a member has transformed my booking experience. The benefits are incredible!"
              </p>
              <footer className="mt-4 text-gray-600">- Alex, Happy Member</footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow-md max-w-lg text-left">
              <p className="text-lg text-gray-800 italic">
                "The exclusive features and early access to new tools are worth every penny. Highly recommend!"
              </p>
              <footer className="mt-4 text-gray-600">- Jamie, Satisfied User</footer>
            </blockquote>
          </div>
        </section>
      </main>

      <footer className="bg-white w-full py-4 shadow-md text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} Zoomzzz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BecomeMemberPage;
