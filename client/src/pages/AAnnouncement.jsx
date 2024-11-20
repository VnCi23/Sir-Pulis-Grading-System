import React, { useState } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Announcement1', content: 'content1' },
    { id: 2, title: 'Announcement2', content: 'content2' },
    { id: 3, title: 'Announcement3', content: 'kingina' },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now() }]);
      setNewAnnouncement({ title: '', content: '' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto w-full max-w-md border-2 bg-white border-yellow-500 rounded-lg shadow-lg">
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
          <div key={announcement.id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <p className="mt-2">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
