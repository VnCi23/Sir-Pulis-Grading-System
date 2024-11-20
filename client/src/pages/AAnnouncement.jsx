import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddAnnouncement = async () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      try {
        const response = await axios.post('http://localhost:5000/api/announcements', newAnnouncement);
        setAnnouncements([...announcements, response.data]);
        setNewAnnouncement({ title: '', content: '' });
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto w-full max-w-md border-2 bg-white rounded-lg shadow-lg">
        <div className="mt-10 text-center font-bold text-xl text-gray-800">Create New Announcement</div>
        <div className="p-8">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newAnnouncement.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-4 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newAnnouncement.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-4 py-6 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            rows="5"
          />
          <button
            onClick={handleAddAnnouncement}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add Announcement
          </button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map(announcement => (
          <div key={announcement._id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <p className="mt-2">{announcement.content}</p>
            <button
              onClick={() => handleDeleteAnnouncement(announcement._id)}
              className="mt-2 w-20 bg-red-500 text-white py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
