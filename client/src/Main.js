import React from 'react';
import aa from './assets/aa.jpg';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <main className="dark:bg-blue-800 bg-white relative overflow-hidden min-h-screen">
      <header className="mt-8 h-24 sm:h-25 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase dark:text-white font-black text-2xl">
          Makati Science Technological Institute of the Philippines 
          </div>
        </div>
      </header>
        <div className="bg-white dark:bg-blue-800 flex justify-center items-center relative z-20 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row py-16">
                <div className="w-full md:w-2/3 lg:w-2/5 flex flex-col">
                <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
                 MSTIP Online Grading System
                </h1>
                <p className="text-sm sm:text-base font-medium pt-5 text-blue-700 dark:text-white">
                Welcome to the MSTIP Grading System! Our platform makes tracking academic progress easy. Students can quickly check their grades and monitor their success. Administrators will find it simple to manage users, grades, and processes. Only MSTIP students and administrators can log in. Let's succeed together! 🚀
                </p>
                <div className="flex mt-8">
                  <Link
                    to="/login"
                    className="uppercase py-2 px-4 rounded-lg bg-yellow-500 border-2 border-transparent text-white text-md mr-4 hover:bg-yellow-400"
                  >
                    Log In
                  </Link>
                  {/* <Link to="/tor">
                    <button className="uppercase py-2 px-4 rounded-lg bg-yellow-500 border-2 border-transparent text-white text-md mr-4 hover:bg-yellow-400">
                    Request TOR
                    </button>
                  </Link> */}
                    <a href="http://mstip.edu.ph/" className="py-2 px-4 rounded-lg bg-transparent border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white text-md">
                    About MSTIP
                    </a>
                </div>
                </div>
                <div className="hidden md:block md:w-1/3 lg:w-3/5 relative">
                  <img src={aa} className="max-w-[15rem] md:max-w-[20rem] m-auto shadow-custom-black border-8 border-yellow-500"/>
                </div>
            </div>
         </div>
    </main>
  );
};

export default Main;
