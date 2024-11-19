import React, { useState } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Announcement1', content: 'content1', role: 'all' },
    { id: 2, title: 'Announcement2', content: 'content2', role: 'teacher' },
    { id: 3, title: 'Announcement3', content: 'kingina', role: 'student' },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', role: 'all' });
  const [filterRole, setFilterRole] = useState('all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prevState => ({ ...prevState, [name]: value }));
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    filterRole === 'all' || announcement.role === filterRole
  );

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now() }]);
      setNewAnnouncement({ title: '', content: '', role: 'all' });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto w-full max-w-md border-2 bg-white border-yellow-500 rounded-lg shadow-lg">
        <div className="mt-10 text-center font-bold text-xl text-gray-800">Create New Announcement</div>
        <div className="p-8">
          <textarea
            name="announcement"
            placeholder="Title and Content"
            value={newAnnouncement.announcement}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-4 py-6 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            rows="5"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Send to</label>
            <select
              name="role"
              value={newAnnouncement.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              <option value="all">All</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleAddAnnouncement}
              className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition duration-300"
            >
              Add Announcement
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-center pt-8">
        <label className="mr-2 font-semibold text-lg">Filter by role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-3 bg-yellow-500 border border-gray-300 rounded text-lg"
        >
          <option value="all">All</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
      </div>

      <h2 className="text-3xl font-semibold mb-6">Announcements</h2>
      <ul className="flex flex-wrap justify-center gap-6 p-6">
        {filteredAnnouncements.map(announcement => (
          <li key={announcement.id} className="p-6 max-w-md flex flex-col rounded-lg shadow-lg bg-white border hover:bg-yellow-100 transition duration-300">
            <h3 className="font-bold">{announcement.title}</h3>
            <p >{announcement.content}</p>
            <p className="text-gray-400">Target Audience: {announcement.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
