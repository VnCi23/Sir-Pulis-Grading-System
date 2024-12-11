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
    <div className="container mx-auto p-3">
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map(announcement => (
          <div key={announcement._id} className="mx-auto w-full max-w-md p-5  bg-white border-8 border-yellow-500 rounded-3xl">
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <hr />
            <p className="mt-2">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAnnouncements;