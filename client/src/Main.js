import React, { useState } from 'react';
import mstip from './assets/mstip.jpg';
import { Link } from 'react-router-dom';


const Main = () => {
  const [userType, setUserType] = useState('student');

  return (
    <main className="dark:bg-blue-800 bg-white relative overflow-hidden min-h-screen">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-blue-800 dark:text-white font-black text-3xl">
            MSTIP
          </div>
        </div>
      </header>
        <div className="bg-white dark:bg-blue-800 flex justify-center items-center relative z-20 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row relative py-16">
                <div className="w-full md:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <h1 className="font-bebas-neue uppercase text-2xl sm:text-5xl font-black flex flex-col leading-none dark:text-white text-blue-800">
                    Online Student Portal for Efficient Grading and Academic Tracking.
                </h1>
                <p className="text-sm sm:text-base pt-5 text-blue-700 dark:text-white">
                Ang programang ito ay Rated SPG. Striktong patnubay at gabay ng magulang ang kailangan. Maaaring may maseselang tema, lingguwahe, karanasan, sexual, horror, o droga. na hindi angkop sa mga bata. 
                </p>
                <div className="flex mt-8">
                  <Link
                    to="/login"
                    className="uppercase py-2 px-4 rounded-lg bg-yellow-500 border-2 border-transparent text-white text-md mr-4 hover:bg-yellow-400"
                  >
                    Log In
                  </Link>
                    <a href="http://mstip.edu.ph/" className="py-2 px-4 rounded-lg bg-transparent border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white text-md">
                    About MSTIP
                    </a>
                </div>
                </div>
                <div className="hidden md:block md:w-1/3 lg:w-3/5 relative">
                <img src={mstip} className="max-w-xs md:max-w-sm m-auto shadow-2xl border-4 border-yellow-500 shadow-black"/>
                </div>
            </div>
         </div>
    </main>
  );
};

export default Main;
