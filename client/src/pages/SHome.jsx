import React from 'react';

const SHome = () => {
    const username = localStorage.getItem('username'); 

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-3xl p-5 text-blue-600">
                Hello <span className="animate-fadeIn">{username}</span>
            </h1>
            <h3 className="text-lg md:text-xl lg:text-2xlp-5 text-gray-700 max-w-xl mx-auto">
                Hope you're happy with your grades. Remember, every grade is a stepping stone towards your future. 
                Keep pushing forward, stay dedicated, and never stop believing in yourself. 
                Your hard work and perseverance will lead you to great success. Keep up the great work!
            </h3>
        </div>
    );
};

export default SHome;