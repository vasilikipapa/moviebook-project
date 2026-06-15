import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { user, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await user();
        setCurrentUser(data); 
      } catch (error) {
        setCurrentUser(null); 
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setCurrentUser(null); 
      window.location.href = "/"; 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-movie-bg">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>
      
      <Footer isLoggedIn={!!currentUser} onLogout={handleLogout} />
    </div>
  );
}

export default MainLayout;