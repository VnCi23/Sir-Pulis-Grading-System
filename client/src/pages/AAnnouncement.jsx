import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
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
        const response = await axios.post('http://localhost:5000/api/announcements', newAnnouncement);
        setAnnouncements([response.data, ...announcements]);
        setNewAnnouncement({ title: '', content: '' });
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setNewAnnouncement({ title: announcement.title, content: announcement.content });
  };

  const handleUpdateAnnouncement = async () => {
    if (editingAnnouncement && newAnnouncement.title && newAnnouncement.content) {
      try {
        const response = await axios.put(`http://localhost:5000/api/announcements/${editingAnnouncement._id}`, newAnnouncement);
        setAnnouncements(announcements.map(announcement => 
          announcement._id === editingAnnouncement._id ? response.data : announcement
        ));
        setNewAnnouncement({ title: '', content: '' });
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
    <div>
      <div className="mt-10">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            name="title"
            value={newAnnouncement.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-4 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Title"
          />
          <textarea
            name="content"
            value={newAnnouncement.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-4 py-6 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            rows="5"
            placeholder="Content"
          />
          <button
            onClick={editingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
          </button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map(announcement => (
          <div key={announcement._id} className="relative mx-auto w-full max-w-md p-5 pb-16 bg-white border-8 border-yellow-500 rounded-3xl">
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <p className="mt-2">{announcement.content}</p>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 bg-yellow-500">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditAnnouncement(announcement)}
                  className="w-20 bg-blue-500 text-white py-1 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement._id)}
                  className="w-20 bg-red-500 text-white py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
