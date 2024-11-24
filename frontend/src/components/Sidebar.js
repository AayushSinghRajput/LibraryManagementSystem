import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/add-book">Add Book</a>
        </li>
        <li>
          <a href="/manage-users">Manage Users</a>
        </li>
        <li>
          <a href="/borrow-history">Borrow History</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
