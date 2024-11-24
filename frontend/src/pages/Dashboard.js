import React, { useState } from "react";
import { dashboardData } from "../data/dashboardData"; // Import mock dashboard data

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
    <div style={{ padding: "20px" }}>
      {/* Main Container */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Dashboard Overview
        </h2>
        <div
          style={{
            display: "grid",
            gap: "15px",
            gridTemplateColumns: "1fr",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
              <strong>Total Books:</strong> {data.totalBooks}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
              <strong>Total Users:</strong> {data.totalUsers}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
              <strong>Total Borrowed Books:</strong> {data.totalBorrowedBooks}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
              <strong>Total Admins:</strong> {data.totalAdmins}
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: refreshing ? "#ccc" : "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: refreshing ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
            width: "100%",
          }}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
        {refreshing && (
          <p
            style={{
              marginTop: "15px",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Updating data, please wait...
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
