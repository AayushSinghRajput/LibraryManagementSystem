//Next logic
import React, { useState } from "react";
import { usersData } from "../data/usersData";
import "./UserData.css"; // Import CSS for styling

const UserData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersData.filter((user) =>
      user.name.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="user-data">
      <h2>User Overview</h2>
      <div className="user-actions">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {filteredUsers.length > 0 ? (
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="user-item">
              <strong>Name:</strong> {user.name} | <strong>Email:</strong>{" "}
              {user.email} | <strong>Role:</strong> {user.role}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-users">No users found!</p>
      )}
    </div>
  );
};

export default UserData;

// // src/pages/Users.js
// import React, { useState, useEffect } from "react";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of users (replace with actual API)
//     const fetchUsers = async () => {
//       const response = await fetch("/api/users");
//       const data = await response.json();
//       setUsers(data);
//     };
//     fetchUsers();
//   }, []);

//   const handleDeleteUser = (userId) => {
//     // Logic to delete a user (replace with actual API)
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmDelete) {
//       setUsers(users.filter((user) => user.id !== userId));
//       // Call API to delete the user here
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <p>
//               {user.name} ({user.email})
//             </p>
//             <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Users;
