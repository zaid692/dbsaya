"use client";
import { useState } from "react";
import Link from "next/link";
import { Warehouse, PhoneIncoming, User, Search, ShoppingCart } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDiv = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <nav className="w-full bg-transparent absolute top-0 left-0 z-50 ">
        <div className="mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={toggleDiv} className="text-3xl ">
              ☰
            </button>
            <Link href="/slider">
              <img src="/assets/lg.png" alt="Logo" className="ml-4 h-25 w-auto" />
            </Link>
          </div>

          
          <div className="flex items-center">
            
            <div className="hidden md:flex space-x-6 items-center px-8">
              <a href="#home" className="text-gray-800 hover:text-blue-600">Search</a>
              <a href="#about" className="text-gray-800 hover:text-blue-600">Account</a>
              <a href="#services" className="text-gray-800 hover:text-blue-600">White List</a>
              <a href="#contact" className="text-gray-800 hover:text-blue-600">Cart</a>
            </div>

            
            <div className="flex space-x-4 md:hidden pr-8">
              <button className="text-gray-800 hover:text-blue-600">
                <Search size={20} />
              </button>
              <button className="text-gray-800 hover:text-blue-600">
                <User size={20} />
              </button>
              <button className="text-gray-800 hover:text-blue-600">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="w-full md:w-1/3 max-h-screen overflow-y-auto font-semibold bg-white shadow-lg rounded-lg py-4 px-10 space-y-4 absolute top-0 left-0 mt-2 transform transition-all duration-300 ease-in-out z-50">
            <button 
              onClick={toggleDiv} 
              className="absolute top-4 right-4 text-gray-700 text-3xl hover:text-red-500 transition-colors duration-200"
            >
              ×
            </button>

            <div className="flex flex-row space-x-2 justify-center ">
              <Link href="/contactuss">
                <div className="border rounded-2xl flex flex-col items-center p-2">
                  <PhoneIncoming className="h-12"/>
                  <p className="text-xs">contact us</p>
                </div>
              </Link>
         
                <div className="border rounded-2xl flex flex-col items-center p-2">
                  <Warehouse className="h-12"/>
                  <p className="text-xs">contact us</p>
                </div>
            
              <div className="border rounded-2xl flex flex-col items-center p-2">
                <PhoneIncoming className="h-12"/>
                <p className="text-xs">contact us</p>
              </div>
            </div>

            <div className="p-4 mb-6 flex gap-6">
              <h1>Women</h1>
              <h1>Men</h1>
              <h1>Kids</h1>
            </div>
          
            <div className="flex justify-between font-semibold text-gray-300">
              <Link href="./arrival" className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                New Arrivals <span className="text-red-400">Winters </span>
              </Link>
              <span className="text-gray-600 mr-5">+</span>
            </div>

            <div className="flex justify-between">
              <Link href="#" className="text-blue-300 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                Mother Day Sale <span className="text-white bg-green-400 ml-4 px-4 py-1">sale 50%</span>
              </Link>
              <span className="mr-5">+</span>
            </div>

            <div className="flex justify-between">
              <Link href="./summerlawn" className="text-yellow-500 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                Summer lawn 25 <span className="text-black">sale 50%</span>
              </Link>
              <span className="mr-5">+</span>
            </div>

            <div className="flex justify-between">
              <Link href="#" className="text-gray-400 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                Special Offers <span className="text-yellow-200 ml-2">🎨🎨🎨</span>
              </Link>
              <span className="mr-5">+</span>
            </div>

            <div className="flex justify-between font-semibold">
              <Link href="./arrival" className="text-gray-400 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                Best <span className="">Selelrs </span>
              </Link>
              <span className="text-gray-600 mr-5">+</span>
            </div>

            <div className="flex justify-between">
              <Link href="./arrival" className="text-blue-400 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                New Arrivals
              </Link>
              <span className="text-gray-600 mr-5">+</span>
            </div>

            <div className="flex justify-between">
              <Link href="./arrival" className="text-gray-400 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                MENS
              </Link>
              <span className="text-gray-600 mr-4">+</span>
            </div>

            <div className="flex justify-between">
              <Link href="./arrival" className="text-gray-400 hover:text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg transition-colors duration-200">
                Kids
              </Link>
              <span className="text-gray-600 mr-4">+</span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;