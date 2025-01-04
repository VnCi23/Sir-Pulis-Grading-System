import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', date: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

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
        const response = await axios.post('http://localhost:5000/api/announcements', { ...newAnnouncement, date: new Date().toISOString() });
        setAnnouncements([response.data, ...announcements]);
        setNewAnnouncement({ title: '', content: '', date: '' });
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setNewAnnouncement({ title: announcement.title, content: announcement.content, date: announcement.date });
  };

  const handleUpdateAnnouncement = async () => {
    if (editingAnnouncement && newAnnouncement.title && newAnnouncement.content) {
      try {
        const response = await axios.put(`http://localhost:5000/api/announcements/${editingAnnouncement._id}`, newAnnouncement);
        setAnnouncements(announcements.map(announcement => 
          announcement._id === editingAnnouncement._id ? response.data : announcement
        ));
        setNewAnnouncement({ title: '', content: '', date: '' });
        setEditingAnnouncement(null);
      } catch (error) {
        console.error('Error updating announcement:', error);
      }
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      setAnnouncements(announcements.filter(announcement => announcement._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="max-h-[32rem] overflow-y-auto p-4">
      <div>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            name="title"
            value={newAnnouncement.title}
            onChange={handleChange}
            className="mt-3 block w-full rounded-full border-2 border-blue-300 bg-yellow-100 px-2 py-1 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Announcements Title"
          />
          <textarea
            name="content"
            value={newAnnouncement.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-2 border-blue-300 bg-yellow-100 px-2 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-left"
            rows="15"
            placeholder="Content"
          />
          <button
            onClick={editingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}
            className="mt-2 w-full bg-yellow-500 text-white py-1 rounded-full shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
          </button>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.slice().reverse().map(announcement => (
          <div key={announcement._id} className="relative mx-auto w-full max-w-md p-4 bg-white border-2 border-yellow-500 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">{announcement.title}</h2>
            <p className="text-sm text-gray-500">{new Date(announcement.date).toLocaleString()}</p>
            <hr className="mb-2" />
            <p className="mt-1 text-left pb-8 font-normal whitespace-pre-line">{announcement.content}</p>
            <div className="absolute bottom-0 left-0 right-0 flex justify-start p-2 bg-yellow-500">
              <button
                onClick={() => handleEditAnnouncement(announcement)}
                className="w-16 bg-blue-500 text-white py-1 rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAnnouncement(announcement._id)}
                className="w-16 ml-1 bg-red-500 text-white py-1 rounded-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;