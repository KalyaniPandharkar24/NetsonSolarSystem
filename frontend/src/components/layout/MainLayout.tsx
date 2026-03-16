import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import WhatsAppFloat from "../home/WhatsAppFloat";
import ChatBot from "../home/ChatBot";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",

        // ⭐ IMPORTANT FIX
        backgroundColor: "#F8FAFC", 
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING BUTTONS */}
      <Box
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 1300,
        }}
      >
        <ChatBot />
        <WhatsAppFloat />
      </Box>
    </Box>
  );
};

export default MainLayout;
