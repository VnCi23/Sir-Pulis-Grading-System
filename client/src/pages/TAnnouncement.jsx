import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map(announcement => (
          <div key={announcement._id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <p className="mt-2">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TAnnouncements;