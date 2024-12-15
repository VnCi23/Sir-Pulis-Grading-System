import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

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

  return (
    <div className="container mx-auto p-3 overflow-y-auto" style={{ maxHeight: '500px' }}>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map(announcement => (
          <div key={announcement._id} className="mx-auto w-full max-w-md p-5 bg-white border-2 border-yellow-500 rounded-3xl">
            <h2 className="text-lg font-bold mb-2">{announcement.title}</h2>
            <hr className="mb-2" />
            <p className="mt-2 text-base text-left whitespace-pre-line">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAnnouncements;