import React, { useState } from 'react';

const Announcements = () => {
  // Sample announcements data
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'School Closure', date: '2024-10-25', content: 'School will be closed for a holiday.', role: 'all' },
    { id: 2, title: 'Parent-Teacher Conference', date: '2024-11-01', content: 'Join us for the parent-teacher conference next week.', role: 'teacher' },
    { id: 3, title: 'New Library Hours', date: '2024-10-26', content: 'The library will open at 10 AM.', role: 'student' },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', date: '', content: '', role: 'all' });
  const [filterRole, setFilterRole] = useState('all');

  // Handle input changes for new announcement
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle filtering announcements
  const filteredAnnouncements = announcements.filter(announcement =>
    filterRole === 'all' || announcement.role === filterRole
  );

  // Add new announcement
  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now() }]);
      setNewAnnouncement({ title: '', date: '', content: '', role: 'all' }); // Reset form
    }
  };

  return (
    <div className="container mx-auto p-6">

    {/* New Announcement Form */}
    <div className="mx-5 border-2 bg-blue-100 border-blue-500 rounded-lg">
      <div className="mt-10 text-center font-bold">Create New Announcement</div>
      <div className="p-8">
        <input
          type="text"
          name="title"
          placeholder="Announcement Title"
          value={newAnnouncement.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />
        <input
          type="date"
          name="date"
          value={newAnnouncement.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />
        <textarea
          name="content"
          placeholder="Announcement Content"
          value={newAnnouncement.content}
          onChange={handleChange}
          className="mb-10 block w-full resize-none rounded-md border border-slate-300 p-5 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        ></textarea>
        <select
          name="role"
          value={newAnnouncement.role}
          onChange={handleChange}
          className="block w-full rounded-md border border-slate-300 bg-yellow-500 px-3 py-3 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 sm:text-sm"
        >
          <option value="all">All</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleAddAnnouncement}
            className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white hover:bg-blue-800 transition duration-300"
          >
            Add Announcement
          </button>
        </div>
      </div>
    </div>


      {/* Filter Announcements */}
      <div className="mb-6 flex justify-center pt-8">
        <label className="mr-2 font-semibold">Filter by role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 bg-yellow-500 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
      </div>

      {/* Announcements List */}
      <h2 className="text-2xl font-semibold mb-4">Upcoming Announcements</h2>
      <ul className="flex flex-wrap justify-center gap-4 p-4">
        {filteredAnnouncements.map(announcement => (
          <li key={announcement.id} className="p-4 max-w-sm flex flex-col rounded-lg shadow-lg bg-blue-100 border hover:bg-blue-200 transition duration-300">
            <h3 className="font-bold text-lg">{announcement.title}</h3>
            <p className="text-gray-500">{announcement.date}</p>
            <p>{announcement.content}</p>
            <p className="text-gray-400 text-sm">Target Audience: {announcement.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
