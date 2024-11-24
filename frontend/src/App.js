import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BorrowHistory from "./pages/BorrowHistory";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Settings from "./pages/Settings";
import AddBook from "./pages/AddBook";
import ManageUsers from "./pages/ManageUsers";
const App = () => {
  const [newBook, setNewBook] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assume a simple auth state

  const addBook = (book) => {
    setNewBook(book);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
      <div className="app">
        <Header />
        <Sidebar />
        <main
          className="content"
          style={{ marginLeft: "300px", padding: "20px" }}
        >
          <h2>Welcome to the Library Management System</h2>
        </main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books newBooks={newBook} />} />
          <Route path="/add-book" element={<AddBook addBook={addBook} />} />
          <Route path="/borrow-history" element={<BorrowHistory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Settings />} />}
          />
          <Route
            path="/manage-users"
            element={<PrivateRoute element={<ManageUsers />} />}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/manage-users" element={<ManageUsers />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
