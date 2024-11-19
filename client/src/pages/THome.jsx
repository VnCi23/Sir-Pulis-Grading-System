import React from 'react';

const THome = () => {
    const username = localStorage.getItem('username'); 

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-3xl p-5 text-blue-600">
                Hello <span className="animate-fadeIn">{username}</span>
            </h1>
            <h3 className="text-lg md:text-xl lg:text-2xlp-5 text-gray-700 max-w-xl mx-auto">
            I hope you are well. Please consider giving your student a good grade as they have been working very hard and are dedicated to their studies. Your support would greatly motivate them to continue striving for excellence.
            </h3>
        </div>
    );
};

export default THome;