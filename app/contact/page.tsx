import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Link from "next/link";

const ContactPage= () =>  {
   return (
    <div className="w-full bg-white p-8 md:p-12 rounded-xl shadow-md border my-10">

      {/* HEADER */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b pb-3" style={{color: "#1f1f1f"}}>
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-5">

          {/* ADDRESS */}
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-orange-400 text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg" style={{color: "#1f1f1f"}}>Address</h3>
              <p className="text-gray-700">
                No 344, 1st Floor,<br />
                Opp. Govt High School,<br />
                Hegganahalli Main Road,<br />
                Hegganahalli, Bangalore 560091.
              </p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-orange-400 text-xl" />
            <div>
              <h3 className="font-semibold text-lg" style={{color: "#1f1f1f"}}>Email</h3>
              <a
                href="mailto:sales@tekboat.in"
                className="text-gray-700 hover:text-blue-700"
              >
                sales@tekboat.in
              </a>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-4">
            <FaPhone className="text-orange-400 text-xl" />
            <div>
              <h3 className="font-semibold text-lg" style={{color: "#1f1f1f"}}>Phone</h3>
              <a
                href="tel:+918792153866"
                className="text-gray-700 hover:text-blue-700"
              >
                +91 8792153866
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – ACTION BUTTON */}
        <div className="flex flex-col justify-start items-start md:items-end flex-1">
          <Link
            href="/contact/new"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-sm md:text-base shadow-md transition"
          >
            Submit New Inquiry
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;