import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('https://sir-pulis-grading-system-h789.vercel.app/api/announcements');
      setAnnouncements(response.data.reverse());
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    document.getElementById(announcement._id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-6 overflow-y-auto" style={{ maxHeight: '500px' }}>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map(announcement => (
          <div
            id={announcement._id}
            key={announcement._id}
            onClick={() => handleCardClick(announcement)}
            className={`mx-auto w-full max-w-md p-6 bg-white shadow-lg border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl ${
              selectedAnnouncement && selectedAnnouncement._id !== announcement._id ? 'blur-sm hover:blur-none' : ''
            } ${selectedAnnouncement && selectedAnnouncement._id === announcement._id ? 'ring-2 ring-blue-500' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out' }}
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{announcement.title}</h2>
            <p className="text-sm text-gray-500">{new Date(announcement.date).toLocaleString()}</p>
            <hr className="mb-3" />
            <p className="mt-3 text-base text-left text-gray-600 whitespace-pre-line">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAnnouncements;