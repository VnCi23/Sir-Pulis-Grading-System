import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import pic1 from '../assets/pals/main.jpeg';

const FacebookIcon = () => (
  <svg className="w-4 h-4 text-blue-400 inline-block" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
  </svg>
);

const DeveloperCard = ({ name, emoji, facebookUrl }) => (
  <a
    href={facebookUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open Facebook profile of ${name}`}
    title={`Open Facebook profile of ${name}`}
    className="w-full max-w-xs mx-auto bg-[#011522] rounded-lg overflow-hidden shadow-lg flex flex-col transition-transform duration-300 hover:scale-105 focus:scale-105 outline-none group focus-visible:ring-4 focus-visible:ring-blue-400"
    style={{ minHeight: '254px', minWidth: '190px' }}
    tabIndex={0}
  >
    {/* Tools bar */}
    <div className="flex items-center px-3 py-2">
      <span className="inline-block w-3 h-3 rounded-full bg-[#ff605c] mr-2"></span>
      <span className="inline-block w-3 h-3 rounded-full bg-[#ffbd44] mr-2"></span>
      <span className="inline-block w-3 h-3 rounded-full bg-[#00ca4e]"></span>
    </div>
    {/* Card content */}
    <div className="flex flex-col items-center justify-center flex-1 px-4 pb-4">
      <span className="text-6xl mb-3 transition-transform duration-300 group-hover:scale-125">{emoji}</span>
      <p className="text-base font-bold text-white text-center flex items-center gap-2">
        <FacebookIcon />
        {name}
      </p>
    </div>
  </a>
);

const Cog = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const developers = [
    {
      name: 'Vince Christian Gaurino',
      emoji: '🦸‍♂️',
      facebookUrl: 'https://web.facebook.com/VnCi.23/',
    },
    {
      name: 'Jan Anferney Ibe',
      emoji: '🧑‍💻',
      facebookUrl: 'https://web.facebook.com/anferni.pascual',
    },
    {
      name: 'John Jefferson Obenza',
      emoji: '🧑‍🔬',
      facebookUrl: 'https://web.facebook.com/john.jefferson.obenza',
    },
    {
      name: 'Revic Dolot',
      emoji: '🧑‍🚀',
      facebookUrl: 'https://web.facebook.com/wwwvsooo',
    },
    {
      name: 'Carlo Noveno',
      emoji: '🧑‍🎨',
      facebookUrl: 'https://web.facebook.com/carlo.noveno.77',
    },
    {
      name: 'Marc Arronn Abejo',
      emoji: '🧑‍🏫',
      facebookUrl: 'https://web.facebook.com/marc.abejo',
    },
    {
      name: 'Albert Anthony Napal',
      emoji: '🧑‍🔧',
      facebookUrl: 'https://web.facebook.com/FredChicken16',
    },
    {
      name: 'Christian Enrico Reyes',
      emoji: '🧑‍🚒',
      facebookUrl: 'https://web.facebook.com/christian.enrico.reyes.2024',
    },
    {
      name: 'Johnsin Almonguera',
      emoji: '🧑‍🌾',
      facebookUrl: 'https://web.facebook.com/johnsin.almonguera',
    },
  ];

  // More dynamic animation with staggered delay
  const aosAnimations = ['fade-up', 'fade-down', 'fade-right', 'fade-left'];

  return (
    <div className="bg-blue-800 relative overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pic1})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <p className="text-sm md:text-xl mt-8 text-white font-medium">
              This mini capstone project was developed by third-year students at MakSci, starting from a simple idea that gradually grew into a fully realized project. Built entirely from scratch, it reflects our creativity, problem-solving skills, and dedication to learning.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Cards */}
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-xl font-bold text-yellow-400 text-center mb-5">
          Meet the Contributors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <div
              data-aos={aosAnimations[index % aosAnimations.length]}
              data-aos-delay={index * 100}
              key={index}
            >
              <DeveloperCard
                name={dev.name}
                emoji={dev.emoji}
                facebookUrl={dev.facebookUrl}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-2">
        <div className="container mx-auto text-center">
          <p className="text-xs">
            © 2025 Ginggoy's System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Cog;