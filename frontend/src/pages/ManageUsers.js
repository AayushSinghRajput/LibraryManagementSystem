import React, { useState, useEffect } from "react";
import { usersData } from "../data/usersData"; // Import user data
import "./ManageUsers.css"; // Import CSS for styling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load initial user data from the usersData file
  useEffect(() => {
    setUsers(usersData); // Load data from the static file
  }, []);

  const handleToggleActive = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users by search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-users-container">
      <h2 className="manage-users-heading">Manage Users</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className={user.isActive ? "active" : "inactive"}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`status ${user.isActive ? "active" : "inactive"}`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleActive(user.id)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
