import React from 'react';
import aa from './assets/aa.jpg';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <main className="dark:bg-blue-800 bg-white relative overflow-hidden min-h-screen">
      <header className="mt-5 h-20 sm:h-22 flex items-center z-30 w-full">
        <div className="container mx-auto px-5 flex items-center justify-between">
          <div className="uppercase dark:text-white font-black text-xl">
            Makati Science Technological Institute of the Philippines 
          </div>
        </div>
      </header>
      <div className="bg-white dark:bg-blue-800 flex justify-center items-center relative z-20 overflow-hidden">
        <div className="container mx-auto px-10 flex flex-col md:flex-row py-12">
          <div className="w-full md:w-2/3 lg:w-2/5 flex flex-col">
            <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
              MSTIP Online Grading System
            </h1>
            <p className="text-base font-medium py-7 text-white">
              Welcome to the MSTIP Grading System! Our platform makes tracking academic progress easy. Students can quickly check their grades. Administrators will find it simple to manage users and grades. Only MSTIP students and administrators can log in.
            </p>
            <div className="flex mt-6">
              <Link
                to="/login"
                className="flex items-center justify-center outline-none cursor-pointer w-32 h-10 bg-gradient-to-t from-yellow-300 via-yellow-500 to-yellow-300 rounded-lg border border-yellow-500 transition-all duration-200 ease-in font-sans text-sm font-semibold text-gray-600 shadow-sm hover:shadow-2xl active:shadow-2xl focus:shadow-inherit mr-3"
              >
                Log In
              </Link>
              {/* <Link to="/tor">
                  <button className="uppercase py-2 px-4 rounded-lg bg-yellow-500 border-2 border-transparent text-white text-md mr-4 hover:bg-yellow-400">
                  Request TOR
                  </button>
              </Link> */}
              <a
                href="http://mstip.edu.ph/"
                className="flex items-center justify-center outline-none cursor-pointer w-32 h-10 bg-transparent border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white text-sm font-semibold transition-all duration-200 ease-in rounded-lg shadow-sm hover:shadow-lg active:shadow-inner focus:shadow-inner"
              >
                About MSTIP
              </a>
            </div>
          </div>
          <div className="hidden p-5 md:block md:w-1/3 lg:w-3/5 relative">
            <img src={aa} className="max-w-[14rem] md:max-w-[18rem] m-auto shadow-custom-black border-8 border-yellow-500 rounded-3xl"/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
