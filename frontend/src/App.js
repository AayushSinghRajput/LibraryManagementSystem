import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BorrowHistory from "./pages/BorrowHistory";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Settings from "./pages/Settings";
import AddBook from "./pages/AddBook";
import ManageUsers from "./pages/ManageUsers";
import { booksData } from "./data/booksData"; // Import initial data
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  });
  const [isLoading, setIsLoading] = useState(false); //Track loading state
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  // Initialize books from localStorage or default to booksData
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : booksData;
  });

  // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Protected Route Component
  const PrivateRoute = ({ element }) => {
    const location = useLocation();
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  };

  return (
    <AuthProvider>
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
            <Route
              path="/books"
              element={<Books books={books} setBooks={setBooks} />}
            />
            <Route
              path="/add-book"
              element={
                <PrivateRoute
                  element={
                    <AddBook
                      addBook={(newBook) =>
                        setBooks((prev) => [...prev, newBook])
                      }
                    />
                  }
                />
              }
            />
            <Route path="/borrow-history" element={<BorrowHistory />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={handleLogin}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/logout"
              element={
                <Logout
                  setIsAuthenticated={handleLogout}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  setIsAuthenticated={handleLogin}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />

            <Route path="/settings" element={<Settings />} />
            <Route
              path="/manage-users"
              element={<PrivateRoute element={<ManageUsers />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
