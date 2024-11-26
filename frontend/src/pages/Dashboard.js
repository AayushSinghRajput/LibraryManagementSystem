import React, { useState } from "react";
import { dashboardData } from "../data/dashboardData"; // Import mock dashboard data
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [data, setData] = useState(dashboardData);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh with a timeout
    setTimeout(() => {
      setData({
        ...data,
        totalBooks: data.totalBooks + Math.floor(Math.random() * 10),
        totalUsers: data.totalUsers + Math.floor(Math.random() * 5),
        totalBorrowedBooks:
          data.totalBorrowedBooks + Math.floor(Math.random() * 7),
        totalAdmins: data.totalAdmins + (Math.random() > 0.5 ? 1 : 0),
      });
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="dashboard-container">
      {/* Main Container */}
      <h2 className="dashboard-heading">Dashboard Overview</h2>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <p>
            <strong>Total Books:</strong> {data.totalBooks}
          </p>
        </div>
        <div className="dashboard-stat">
          <p>
            <strong>Total Users:</strong> {data.totalUsers}
          </p>
        </div>
        <div className="dashboard-stat">
          <p>
            <strong>Total Borrowed Books:</strong> {data.totalBorrowedBooks}
          </p>
        </div>
        <div className="dashboard-stat">
          <p>
            <strong>Total Admins:</strong> {data.totalAdmins}
          </p>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        className="dashboard-button"
        disabled={refreshing}
      >
        {refreshing ? "Refreshing..." : "Refresh Data"}
      </button>

      {refreshing && (
        <p className="dashboard-refreshing-text">
          Updating data, please wait...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
