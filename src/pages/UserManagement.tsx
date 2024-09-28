import React, { useState } from 'react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold">User Management</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Last Active</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">name</td>
            <td className="p-2">role</td>
            <td className="p-2">Active</td>
            <td className="p-2">
              <button className="mr-2 text-blue-500 hover:underline">
                Edit
              </button>
              <button className="text-red-500 hover:underline">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
