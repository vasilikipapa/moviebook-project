import React from "react";
import Navbar from "../Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function NavBarLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-movie-bg">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

export default NavBarLayout;