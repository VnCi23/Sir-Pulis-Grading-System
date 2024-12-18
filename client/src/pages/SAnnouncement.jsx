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
      const response = await axios.get('http://localhost:5000/api/announcements');
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
            className={`mx-auto w-full max-w-md p-6 bg-white shadow-lg border border-gray-200 rounded-lg transition-transform transform hover:scale-105 ${
              selectedAnnouncement && selectedAnnouncement._id !== announcement._id ? 'blur-2xl hover:blur-none' : ''
            } ${selectedAnnouncement && selectedAnnouncement._id === announcement._id ? 'ring-2 ring-blue-500' : ''}`}
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{announcement.title}</h2>
            <hr className="mb-3" />
            <p className="mt-3 text-base text-left text-gray-600 whitespace-pre-line">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAnnouncements;