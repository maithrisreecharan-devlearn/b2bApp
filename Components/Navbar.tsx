"use client";

import Link from "next/link";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";


export default function Navbar() {

  return (
    
    <nav className="w-full">

      {/* TOP STRIP */}
      <div className="w-full bg-[#1f1f1f] text-white py-2 px-6 md:px-20 flex justify-between items-center text-sm">

        {/* LEFT LINKS */}
        <div className="flex items-center gap-4 text-orange-400 font-medium">
          <Link href="#">Order Status</Link>
          <span className="text-gray-500">|</span>
          <Link href="#">BOM</Link>
          <span className="text-gray-500">|</span>
          <Link href="#">Help</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 text-white">
          <Link href="/contact/new">Create Account</Link>
          <span className="text-gray-500">|</span>
          <Link href="/contact/new">Login</Link>

          {/* Cart */}
          <Link href="#" className="flex items-center gap-2">
            <FaShoppingCart />
            <span>0 items</span>
          </Link>
        </div>
      </div>

      {/* LOGO + SEARCH BAR */}
        <div className="flex items-center gap-3 cursor-pointer">        {/* Logo */}
          <Image
            src="/logo.png"
            alt="TechBoat Logo"
            width={400}
            height={400}
            className="h-10 w-auto"
          />

        
      </div>

      {/* BOTTOM BLUE NAVBAR */}
      <div className="bg-[#044a6c] text-white py-3">
        <div className="flex justify-center gap-10 text-base font-medium">

          <Link href="/home">Home</Link>

          {/* Category dropdown placeholder */}
          <div className="relative group cursor-pointer">
            <span>Category ▾</span>
            {/* Dropdown placeholder */}
            <div className="absolute hidden group-hover:block bg-white text-black p-3 rounded shadow-md top-7">
              <p className="whitespace-nowrap">Category 1</p>
              <p className="whitespace-nowrap">Category 2</p>
              <p className="whitespace-nowrap">Category 3</p>
            </div>
          </div>

          <Link href="#">BOM Manager</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
