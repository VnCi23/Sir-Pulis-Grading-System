import React from 'react';
import aa from './assets/aa.jpg';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <main className="dark:bg-blue-800 bg-white relative overflow-hidden min-h-screen">
      <header className="h-24 sm:h-25 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-blue-800 dark:text-white font-black text-2xl">
          Makati Science Technological Institute of the Philippines 
          </div>
        </div>
      </header>
        <div className="bg-white dark:bg-blue-800 flex justify-center items-center relative z-20 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row py-16">
                <div className="w-full md:w-2/3 lg:w-2/5 flex flex-col">
                <h1 className="font-bebas-neue uppercase text-2xl sm:text-5xl font-black leading-none dark:text-white text-blue-800">
                 MSTIP Online Grading System
                </h1>
                <p className="text-sm sm:text-base pt-5 text-blue-700 dark:text-white">
                Welcome to the MSTIP Grading System! This platform helps students, teachers, and staff. Students can check their grades and progress. Teachers can update grades easily. Administrators can manage users and the other process. Our goal is to make grading easy and clear. Only students, teachers, and administrators of MSTIP can log in.
                </p>
                <div className="flex mt-8">
                  <Link
                    to="/login"
                    className="uppercase py-2 px-4 rounded-lg bg-yellow-500 border-2 border-transparent text-white text-md mr-4 hover:bg-yellow-400"
                  >
                    Log In
                  </Link>
                  <Link to="/cog">
                    <button className="uppercase py-2 px-4 rounded-lg bg-yellow-500 border-2 border-transparent text-white text-md mr-4 hover:bg-yellow-400">
                    Request TOR
                    </button>
                  </Link>
                    <a href="http://mstip.edu.ph/" className="py-2 px-4 rounded-lg bg-transparent border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white text-md">
                    About MSTIP
                    </a>
                </div>
                </div>
                <div className="hidden md:block md:w-1/3 lg:w-3/5 relative">
                <img src={aa} className="max-w-[15rem] md:max-w-[20rem] m-auto shadow-2xl border-4 border-yellow-500 shadow-black"/>
                </div>
            </div>
         </div>
    </main>
  );
};

export default Main;
