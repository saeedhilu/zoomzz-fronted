import React from "react";
import Logo from "../../assets/LogoIcon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100  py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold">
          <Link to="/">            <img className="w-20 h-20" src={Logo} alt="" />
          </Link>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">COMPANY</h3>
          <ul className="text-gray-600 space-y-2">
            <li>About Us</li>
            <li>Legal Information</li>
            <li>Contact Us</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">HELP CENTER</h3>
          <ul className="text-gray-600 space-y-2">
            <li className="cursor-pointer" >
                <Link to="/room-list">Find a Property</Link>
            </li>
            <li>
              {" "}
              <Link to={"/host-page"}>How To Host?</Link>{" "}
            </li>
            <li>Why Us?</li>
            <li>FAQs</li>
            <li>Rental Guides</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">CONTACT INFO</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Phone: +91 8113985644</li>
            <li>Email: saeedmoozhikkal@email.com</li>
            <li>Location: Kozhkode, Kerala, INDIA</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
