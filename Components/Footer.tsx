"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function FooterPage() {
  return (
    <footer className="bg-[#1f1f1f] text-white py-14 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACT</h3>

            <p className="text-xl font-bold mb-4">B2B COMPONENT</p>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-400 mt-1" />
                <p>
                  Dummy Address, 123 Main Road,<br />
                  Sample Layout, Bangalore 560000.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-400" />
                <a href="#" className="hover:underline">info@example.com</a>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-orange-400" />
                <a href="#" className="hover:underline">+91 9999999999</a>
              </div>
            </div>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>

            <ul className="space-y-3 text-gray-300">
              {[
                "About Us",
                "Contact Us",
                "FAQ's",
                "BOM Manager",
                "Return Policy",
              ].map((label) => (
                <li key={label}>
                  <a href="#" className="flex items-center gap-2 hover:text-white">
                    <FiArrowRight className="text-orange-400" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PROFILE */}
          <div>
            <h3 className="text-lg font-semibold mb-4">PROFILE</h3>

            <ul className="space-y-3 text-gray-300">
              {["My Cart", "Login", "Create Account"].map((label) => (
                <li key={label}>
                  <a href="#" className="flex items-center gap-2 hover:text-white">
                    <FiArrowRight className="text-orange-400" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="text-center text-gray-400 mt-10 text-sm">
          © {new Date().getFullYear()} YourWebsite.com . All rights reserved
        </div>
      </footer>
    
  );
}